const fs = require('fs');

let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

content = content.replace('const [bulkActionType, setBulkActionType] = useState<"approve" | "reject" | null>(null);', 
`const [bulkActionType, setBulkActionType] = useState<"approve" | "reject" | null>(null);
  const [viewItem, setViewItem] = useState<any | null>(null);
  const [modalActionType, setModalActionType] = useState<"approve" | "reject" | null>(null);
  const [modalRemarks, setModalRemarks] = useState("");`);

content = content.replace('import { Check, X, Undo2, Filter, RefreshCcw } from "lucide-react";', 
'import { Check, X, Undo2, Filter, RefreshCcw, Info } from "lucide-react";');

const modalRender = `      {viewItem && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Request Details</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{viewItem._category} &bull; {viewItem._displayDate}</p>
              </div>
              <button onClick={() => setViewItem(null)} className="text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded p-1">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 text-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Requester</p>
                  <p className="font-medium text-slate-700">{viewItem._requester}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Status</p>
                  <p className="font-medium text-slate-700">{viewItem.status}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Title / Type</p>
                <p className="text-slate-700">{viewItem._title}</p>
              </div>
              
              {viewItem._amount != null && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Amount</p>
                  <p className="text-slate-700 font-mono font-medium">₱{viewItem._amount.toLocaleString()}</p>
                </div>
              )}
              
              {viewItem.purpose && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Purpose</p>
                  <p className="text-slate-600 bg-slate-50 p-2 border border-slate-100 rounded text-xs">{viewItem.purpose}</p>
                </div>
              )}
              {viewItem.reason && !viewItem.purpose && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Reason</p>
                  <p className="text-slate-600 bg-slate-50 p-2 border border-slate-100 rounded text-xs">{viewItem.reason}</p>
                </div>
              )}
              
              {viewItem.destination && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Destination</p>
                  <p className="text-slate-700">{viewItem.destination}</p>
                </div>
              )}
              {viewItem.passengers && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Passengers</p>
                  <p className="text-slate-700">{viewItem.passengers}</p>
                </div>
              )}
              {viewItem.dateNeeded && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Date Needed</p>
                  <p className="text-slate-700">{viewItem.dateNeeded}</p>
                </div>
              )}
              {viewItem.meetingDate && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Meeting Date</p>
                  <p className="text-slate-700">{viewItem.meetingDate}</p>
                </div>
              )}
              {viewItem.meetingTitle && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Meeting Title</p>
                  <p className="text-slate-700">{viewItem.meetingTitle}</p>
                </div>
              )}
              {viewItem.quantity && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Quantity</p>
                  <p className="text-slate-700">{viewItem.quantity}</p>
                </div>
              )}

              {isActionable(viewItem.status) && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setModalActionType("reject")} 
                      className={\`flex-1 py-2 text-xs font-bold rounded-lg border \${modalActionType === "reject" ? "bg-amber-500 text-white border-amber-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}\`}
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => setModalActionType("approve")} 
                      className={\`flex-1 py-2 text-xs font-bold rounded-lg border \${modalActionType === "approve" ? "bg-green-600 text-white border-green-700" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}\`}
                    >
                      Approve
                    </button>
                  </div>
                  {modalActionType && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Remarks</label>
                      <input 
                        type="text" 
                        value={modalRemarks}
                        onChange={e => setModalRemarks(e.target.value)}
                        placeholder="Optional remarks..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={async () => {
                          setLoading(true);
                          try {
                            if (viewItem._category === "Personnel Request") {
                              const decision = modalActionType === "approve" ? "Approved" : "Rejected";
                              await apiCall(\`/api/requests/\${viewItem.id}/chief-decide\`, {
                                method: "PUT",
                                body: JSON.stringify({ decision, remarks: modalRemarks || \`\${decision}\` })
                              });
                            } else if (viewItem._category === "Liquidation") {
                              const decision = modalActionType === "approve" ? "Approve" : "Reject";
                              await apiCall(\`/api/liquidation-submissions/\${viewItem.id}/chief-action\`, {
                                method: "PUT",
                                body: JSON.stringify({ action: decision, remarks: modalRemarks || \`\${decision}\` })
                              });
                            } else if (viewItem._category === "Budget Request") {
                              const status = modalActionType === "approve" ? "Approved" : "Rejected";
                              await apiCall(\`/api/budget-requests/\${viewItem.id}/approve\`, {
                                method: "PUT",
                                body: JSON.stringify({ status, remarks: modalRemarks || \`\${status}\` })
                              });
                            }
                            setSuccess("Action applied successfully.");
                            setViewItem(null);
                            setModalActionType(null);
                            setModalRemarks("");
                            fetchData();
                            onRefresh();
                          } catch (err) {
                            setError("Action failed.");
                            setLoading(false);
                          }
                        }}
                        className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-lg shadow-sm hover:bg-slate-800"
                      >
                        Confirm {modalActionType === "approve" ? "Approval" : "Rejection"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
`;

content = content.replace('      {/* Table */}', modalRender + '\n      {/* Table */}');
content = content.replace(/<tr key=\{item._unifiedId\} className=\{\`hover:bg-slate-50 transition-colors \$\{selectedIds.includes\(item._unifiedId\) \? "bg-blue-50\/30" : ""\}\`\}>/g, 
  '<tr key={item._unifiedId} onClick={() => { setViewItem(item); setModalActionType(null); setModalRemarks(""); }} className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedIds.includes(item._unifiedId) ? "bg-blue-50/30" : ""}`}>');

content = content.replace(/<td className="p-3 text-center">/g, '<td className="p-3 text-center" onClick={e => e.stopPropagation()}>');

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);

