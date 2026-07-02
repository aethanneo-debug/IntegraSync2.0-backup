import React, { useState, useEffect } from "react";
import { User, AnyRequest, RequestStatus } from "../types";
import { apiCall, formatDate } from "../utils";
import { Check, X, Undo2, Filter, RefreshCcw } from "lucide-react";

interface AdminUnifiedRequestsProps {
  user: User;
  onRefresh: () => void;
}

export default function AdminUnifiedRequests({ user, onRefresh }: AdminUnifiedRequestsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [allItems, setAllItems] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const [remarks, setRemarks] = useState("");
  const [bulkActionType, setBulkActionType] = useState<"approve" | "return" | "reject" | null>(null);

  useEffect(() => {
    fetchData();
  }, [onRefresh]);

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const [reqRes, subRes, budgetRes] = await Promise.all([
        apiCall("/api/requests"),
        apiCall("/api/liquidation-submissions"),
        apiCall("/api/budget-requests")
      ]);

      const combined: any[] = [];

      let seq = 0;
      
      if (reqRes.status === "success") {
        reqRes.data.forEach((r: any) => {
          // Admin can see everything or just endorsed ones? The instruction says "combine the Request Management and Approval Office Cockpit"
          // In original Request Management, admin sees ALL. Let's show all pending/endorsed for actions.
          // We will show all but actions can only be applied to pending/endorsed.
          combined.push({
            ...r,
            _unifiedId: `req-${r.id}`,
            _category: "Personnel Request",
            _date: new Date(r.dateRequested || r.createdAt).getTime(),
            _displayDate: r.dateRequested || r.createdAt,
            _title: r.leaveType ? `${r.requestType} (${r.leaveType})` : r.requestType,
            _requester: r.employeeName,
            _amount: null,
            _sequence: seq++
          });
        });
      }

      if (subRes.status === "success") {
        subRes.data.forEach((s: any) => {
          combined.push({
            ...s,
            _unifiedId: `liq-${s.id}`,
            _category: "Liquidation",
            _date: new Date(s.createdAt).getTime(),
            _displayDate: s.createdAt,
            _title: `Liquidation ${s.submissionNo}`,
            _requester: s.employeeName,
            _amount: s.totalSpent,
            _sequence: seq++
          });
        });
      }

      if (budgetRes.status === "success") {
        budgetRes.data.forEach((b: any) => {
          combined.push({
            ...b,
            _unifiedId: `bud-${b.id}`,
            _category: "Budget Request",
            _date: new Date(b.createdAt).getTime(),
            _displayDate: b.createdAt,
            _title: `${b.requestType} Request`,
            _requester: b.department,
            _amount: b.amountRequested,
            _sequence: seq++
          });
        });
      }

      // Sort LIFO (Newest First)
      combined.sort((a, b) => {
        if (b._date !== a._date) return b._date - a._date;
        return b._sequence - a._sequence;
      });
      setAllItems(combined);
      setSelectedIds([]);
    } catch (err: any) {
      setError("Failed to retrieve pending approvals payload.");
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = allItems.filter(item => {
    if (filterCategory === "All") return true;
    if (["Personnel Request", "Liquidation", "Budget Request"].includes(filterCategory)) {
      return item._category === filterCategory;
    }
    return item.requestType === filterCategory || item.leaveType === filterCategory;
  });

  const isActionable = (status: string) => {
    if (!status) return false;
    return status.includes("Pending") || status.includes("Endorsed to Division Chief") || status === "Endorsed";
  };

  const actionableItems = filteredItems.filter(item => isActionable(item.status));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === actionableItems.length && actionableItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(actionableItems.map(item => item._unifiedId));
    }
  };

  async function handleBulkAction(action: "approve" | "return" | "reject") {
    if (selectedIds.length === 0) return;
    setLoading(true);
    setError("");
    setSuccess("");

    let successCount = 0;
    let failCount = 0;

    for (const uid of selectedIds) {
      const item = allItems.find(i => i._unifiedId === uid);
      if (!item) continue;

      try {
        if (item._category === "Personnel Request") {
          const decision = action === "approve" ? "Approved" : action === "return" ? "Returned" : "Rejected";
          await apiCall(`/api/requests/${item.id}/chief-decide`, {
            method: "PUT",
            body: JSON.stringify({ decision, remarks: remarks || `Bulk ${decision}` })
          });
        } else if (item._category === "Liquidation") {
          const decision = action === "approve" ? "Approve" : action === "return" ? "Return" : "Reject";
          await apiCall(`/api/liquidation-submissions/${item.id}/chief-action`, {
            method: "PUT",
            body: JSON.stringify({ action: decision, remarks: remarks || `Bulk ${decision}` })
          });
        } else if (item._category === "Budget Request") {
          const status = action === "approve" ? "Approved" : "Returned";
          await apiCall(`/api/budget-requests/${item.id}/approve`, {
            method: "PUT",
            body: JSON.stringify({ status, remarks: remarks || `Bulk ${status}` })
          });
        }
        successCount++;
      } catch (err) {
        failCount++;
      }
    }

    setSuccess(`Processed successfully: ${successCount}. Failed: ${failCount}.`);
    setBulkActionType(null);
    setRemarks("");
    fetchData();
    onRefresh();
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50 gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Unified Request Management & Approvals</h2>
          <p className="text-[10px] text-slate-500">Manage all requests, liquidations, and budget adjustments in one place.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={filterCategory} 
            onChange={e => setFilterCategory(e.target.value)}
            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Personnel Request">All Personnel Requests</option>
            <option value="Sick Leave">-- Sick Leave</option>
            <option value="Vacation Leave">-- Vacation Leave</option>
            <option value="Special Privilege">-- Special Privilege</option>
            <option value="Vehicle Request">-- Vehicle Requests</option>
            <option value="Zoom Access Request">-- Zoom Access</option>
            <option value="Supply Request">-- Supply Requests</option>
            <option value="Liquidation">Liquidations</option>
            <option value="Budget Request">Budget Requests</option>
          </select>
          <button onClick={fetchData} className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded text-slate-600 transition-colors cursor-pointer" title="Refresh">
            <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs border-b border-rose-100">{error}</div>}
      {success && <div className="p-3 bg-emerald-50 text-emerald-700 text-xs border-b border-emerald-100">{success}</div>}

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-800">{selectedIds.length} items selected</span>
          <div className="flex items-center space-x-2">
            <button onClick={() => setBulkActionType("return")} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded text-[11px] font-bold flex items-center cursor-pointer shadow-sm">
              <Undo2 size={12} className="mr-1" /> Return
            </button>
            <button onClick={() => setBulkActionType("reject")} className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded text-[11px] font-bold flex items-center cursor-pointer shadow-sm">
              <X size={12} className="mr-1" /> Reject
            </button>
            <button onClick={() => setBulkActionType("approve")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[11px] font-bold flex items-center cursor-pointer shadow-sm">
              <Check size={12} className="mr-1" /> Approve
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/50 border-b border-slate-200">
              <th className="p-3 w-10 text-center">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === actionableItems.length && actionableItems.length > 0} 
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                  disabled={actionableItems.length === 0}
                />
              </th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date (LIFO)</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Title / Details</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Requester</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-xs text-slate-400">Loading records...</td></tr>
            ) : filteredItems.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-xs text-slate-400">No records found matching criteria.</td></tr>
            ) : (
              filteredItems.map(item => (
                <tr key={item._unifiedId} className={`hover:bg-slate-50 transition-colors ${selectedIds.includes(item._unifiedId) ? "bg-blue-50/30" : ""}`}>
                  <td className="p-3 text-center">
                    {isActionable(item.status) && (
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item._unifiedId)} 
                        onChange={() => toggleSelect(item._unifiedId)}
                        className="cursor-pointer"
                      />
                    )}
                  </td>
                  <td className="p-3 text-[11px] text-slate-600 whitespace-nowrap">{item._displayDate ? item._displayDate.split("T")[0] : "-"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                      item._category === "Personnel Request" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      item._category === "Liquidation" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      "bg-purple-50 text-purple-700 border-purple-200"
                    }`}>
                      {item._category}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-slate-800 font-medium">
                    {item._title}
                    {(item.purpose || item.reason || item.meetingTitle) && <p className="text-[9px] font-normal text-slate-500 mt-0.5 truncate max-w-[200px]">{item.purpose || item.reason || item.meetingTitle}</p>}
                  </td>
                  <td className="p-3 text-xs text-slate-600">{item._requester}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.status?.includes("Approved") || item.status?.includes("Cleared") || item.status?.includes("Endorsed") ? "bg-green-100 text-green-800" :
                      item.status?.includes("Returned") || item.status?.includes("Rejected") ? "bg-red-100 text-red-800" :
                      item.status?.includes("Pending") || item.status?.includes("Endorsed to Division Chief") ? "bg-amber-100 text-amber-800" :
                      "bg-slate-100 text-slate-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-right font-mono text-slate-700">
                    {item._amount != null ? `₱${item._amount.toLocaleString()}` : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Action Modal */}
      {bulkActionType && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70">
              <h2 className="text-xs font-bold text-slate-800 capitalize">Bulk {bulkActionType} ({selectedIds.length} items)</h2>
            </div>
            <div className="p-5 space-y-4">
              <textarea
                placeholder={`Optional remarks for bulk ${bulkActionType}...`}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 font-sans"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setBulkActionType(null)} className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer">Cancel</button>
                <button onClick={() => handleBulkAction(bulkActionType)} className={`px-4 py-1.5 text-xs font-bold text-white rounded cursor-pointer ${
                  bulkActionType === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : 
                  bulkActionType === "return" ? "bg-amber-600 hover:bg-amber-700" : "bg-rose-600 hover:bg-rose-700"
                }`}>
                  Confirm {bulkActionType}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
