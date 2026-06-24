import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { apiCall } from '../utils';

export default function TrainingsSeminarsView({ user, employees }) {
  const isHrOrAdmin = ["Administrator / Division Chief", "HR Officer"].includes(user.role);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(isHrOrAdmin ? "" : user.employeeId);
  const [trainings, setTrainings] = useState([]);
  const [history, setHistory] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTraining, setNewTraining] = useState({
    title: '', organizer: '', dateConducted: '', trainingHours: 0, certificateFilename: ''
  });

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [verifyRemarks, setVerifyRemarks] = useState("");

  useEffect(() => {
    if (selectedEmployeeId) {
      fetchTrainings();
      fetchHistory();
    } else {
      setTrainings([]);
      setHistory([]);
    }
  }, [selectedEmployeeId]);

  const fetchTrainings = async () => {
    try {
      const res = await apiCall(`/api/employees/${selectedEmployeeId}/trainings`);
      const data = res.data || res; // Handle wrapped or unwrapped array
      if (Array.isArray(data)) {
        const mapped = data.map((t: any) => ({
          id: t.id,
          title: t.title,
          organizer: t.organizer,
          dateConducted: t.date_conducted || t.dateConducted,
          trainingHours: t.training_hours || t.trainingHours,
          certificateFilename: t.certificate_file_name || t.certificateFilename,
          status: t.status,
          remarks: t.remarks
        }));
        setTrainings(mapped);
      }
    } catch (err) {
      console.error("Failed to load trainings", err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await apiCall(`/api/employees/${selectedEmployeeId}/history`);
      const data = res.data || res;
      if (Array.isArray(data)) {
        const mapped = data.map((h: any) => ({
          id: h.id,
          effectiveDate: h.effective_date || h.effectiveDate,
          action: h.action,
          newDetails: h.new_details || h.newDetails,
          updatedBy: h.updated_by || h.updatedBy
        }));
        setHistory(mapped);
      }
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  const handleAddEntry = async () => {
    try {
      const payload = {
        title: newTraining.title,
        organizer: newTraining.organizer,
        date_conducted: newTraining.dateConducted,
        training_hours: newTraining.trainingHours,
        certificate_file_name: newTraining.certificateFilename,
        employee_id: selectedEmployeeId
      };
      await apiCall(`/api/employees/${selectedEmployeeId}/trainings`, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setIsModalOpen(false);
      setNewTraining({ title: '', organizer: '', dateConducted: '', trainingHours: 0, certificateFilename: '' });
      fetchTrainings();
    } catch (err) {
      alert("Error adding training: " + err.message);
    }
  };

  const handleUpdateStatus = async (status) => {
    if (!selectedTraining) return;
    try {
      await apiCall(`/api/trainings/${selectedTraining.id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status, remarks: verifyRemarks })
      });
      setVerifyModalOpen(false);
      setSelectedTraining(null);
      setVerifyRemarks("");
      fetchTrainings();
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const openVerifyModal = (training) => {
    setSelectedTraining(training);
    setVerifyRemarks(training.remarks || "");
    setVerifyModalOpen(true);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {isHrOrAdmin && (
          <div className="bg-white p-4 rounded-lg border border-slate-200 flex items-center gap-4 shadow-sm">
            <label className="text-xs font-bold text-slate-600 uppercase">Target Employee Record:</label>
            <select className="border border-slate-300 rounded p-2 text-xs w-72 bg-slate-50" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)}>
              <option value="">-- Choose Employee --</option>
              {employees?.map(emp => (
                <option key={emp.employeeId} value={emp.employeeId}>{emp.fullName} ({emp.employeeId})</option>
              ))}
            </select>
          </div>
        )}

        {!selectedEmployeeId ? (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-8 text-center rounded-lg shadow-sm">
            <p className="font-semibold text-sm">Please select an employee to view their Trainings and Employment History.</p>
          </div>
        ) : (
          <>
            <div className="bg-white p-6 shadow-sm rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-sm font-bold text-slate-700 tracking-wider uppercase">Trainings & Seminars Ledger</h2>
                  <p className="text-xs text-slate-500 mt-1">Official learning interventions requiring HR verification.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold uppercase shadow transition"
                >
                  + Add Training Record
                </button>
              </div>

              <div className="space-y-4">
                {trainings.map((training) => (
                  <div key={training.id} className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition-colors shadow-sm bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-slate-900">{training.title}</h3>
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider ${training.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : training.status === 'Returned' || training.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                          {training.status || 'Pending Verification'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs mb-2">{training.organizer} • {training.dateConducted}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-blue-700 font-bold text-[10px] bg-blue-100 px-2 py-1 rounded">{training.trainingHours} Credit Hours</span>
                        {training.certificateFilename && (
                          <span className="text-slate-500 text-[10px] underline cursor-pointer">View Cert: {training.certificateFilename}</span>
                        )}
                      </div>
                      {training.remarks && (
                        <p className="text-xs text-rose-600 mt-2 bg-rose-50 p-2 rounded border border-rose-100"><strong>HR Remarks:</strong> {training.remarks}</p>
                      )}
                    </div>
                    
                    {isHrOrAdmin && training.status !== 'Verified' && (
                      <div className="flex-shrink-0">
                        <button onClick={() => openVerifyModal(training)} className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-4 py-2 rounded font-bold shadow">
                          Review & Verify
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {trainings.length === 0 && (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg text-center text-slate-400 text-sm">
                    No training records submitted for this employee.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm rounded-lg border border-slate-200">
              <h2 className="text-sm font-bold text-slate-700 tracking-wider uppercase mb-2">Adjudicated Employment History</h2>
              <p className="text-xs text-slate-500 mb-6">Service records generated through official HR administrative actions.</p>
              
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-y border-slate-200 text-slate-600 font-bold">
                    <th className="p-3">Effective Date</th>
                    <th className="p-3">Action / Event</th>
                    <th className="p-3">Details</th>
                    <th className="p-3">HR Operator</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, idx) => (
                    <tr key={h.id || idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3 whitespace-nowrap text-slate-700">{h.effectiveDate}</td>
                      <td className="p-3 font-semibold text-slate-800">{h.action}</td>
                      <td className="p-3 text-slate-600">{h.newDetails}</td>
                      <td className="p-3 text-slate-500">{h.updatedBy}</td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-6 text-center text-slate-400 italic">No employment history events logged.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Add Training Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm tracking-wide">SUBMIT TRAINING / SEMINAR</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-slate-300"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 border border-blue-100 font-medium">
                Record will be attached to Employee ID: <strong>{selectedEmployeeId}</strong>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Training Title *</label>
                <input type="text" placeholder="e.g. Adjudication Fundamentals" className="w-full border border-slate-300 p-2 text-xs rounded focus:border-blue-500 outline-none" value={newTraining.title} onChange={(e) => setNewTraining({...newTraining, title: e.target.value})}/>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Organizing Agency *</label>
                <input type="text" placeholder="e.g. Civil Service Commission" className="w-full border border-slate-300 p-2 text-xs rounded focus:border-blue-500 outline-none" value={newTraining.organizer} onChange={(e) => setNewTraining({...newTraining, organizer: e.target.value})}/>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Date Conducted *</label>
                    <input type="date" className="w-full border border-slate-300 p-2 text-xs rounded focus:border-blue-500 outline-none" value={newTraining.dateConducted} onChange={(e) => setNewTraining({...newTraining, dateConducted: e.target.value})}/>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Credit Hours *</label>
                    <input type="number" className="w-full border border-slate-300 p-2 text-xs rounded focus:border-blue-500 outline-none" value={newTraining.trainingHours} onChange={(e) => setNewTraining({...newTraining, trainingHours: parseInt(e.target.value)})}/>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Digital Certificate Filename</label>
                <input type="text" placeholder="certificate_2023.pdf" className="w-full border border-slate-300 p-2 text-xs rounded focus:border-blue-500 outline-none" value={newTraining.certificateFilename} onChange={(e) => setNewTraining({...newTraining, certificateFilename: e.target.value})}/>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded text-xs font-bold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
                <button onClick={handleAddEntry} className="px-4 py-2 bg-blue-600 rounded text-xs font-bold text-white hover:bg-blue-700 transition shadow">Submit Record</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verify Training Modal */}
      {verifyModalOpen && selectedTraining && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm tracking-wide">HR VERIFICATION</h3>
              <button onClick={() => setVerifyModalOpen(false)} className="hover:text-slate-300"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded text-xs space-y-1">
                <p><strong>Title:</strong> {selectedTraining.title}</p>
                <p><strong>Organizer:</strong> {selectedTraining.organizer}</p>
                <p><strong>Hours:</strong> {selectedTraining.trainingHours} | <strong>Date:</strong> {selectedTraining.dateConducted}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">HR Remarks / Return Reason</label>
                <textarea 
                  className="w-full border border-slate-300 p-2 text-xs rounded h-24 focus:border-blue-500 outline-none" 
                  placeholder="Optional for verification. Required if returning."
                  value={verifyRemarks}
                  onChange={(e) => setVerifyRemarks(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => handleUpdateStatus("Verified")} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow">
                  <CheckCircle size={16} /> Verify & Approve
                </button>
                <button onClick={() => handleUpdateStatus("Returned")} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow">
                  <XCircle size={16} /> Return to Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
