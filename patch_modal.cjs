const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

const target = `  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">`;

const replacement = `  return (
    <>
      {resubmitRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-900 text-white">
              <h2 className="text-sm font-bold tracking-wider font-mono">FILE {resubmitRequest.requestType.toUpperCase()} REQUEST FORM</h2>
              <button onClick={() => setResubmitRequest(null)} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                <XCircle size={18} />
              </button>
            </div>
            
            <form onSubmit={handleRequestResubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Filing As</label>
                <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-semibold">
                  {user.fullName} ({user.role})
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Travel / Target Destination</label>
                  <input
                    type="text"
                    disabled
                    value={resubmitRequest.destination || resubmitRequest.purpose || ""}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Commissions Passengers *</label>
                  <input
                    type="text"
                    disabled
                    value={resubmitRequest.passengers || ""}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(resubmitRequest.requestType === RequestType.LEAVE) ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase font-mono">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={resubmitDates.startDate}
                        onChange={e => setResubmitDates({...resubmitDates, startDate: e.target.value})}
                        className="w-full px-3 py-2 text-xs border border-blue-300 rounded-lg bg-blue-50 text-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase font-mono">End Date *</label>
                      <input
                        type="date"
                        required
                        value={resubmitDates.endDate}
                        onChange={e => setResubmitDates({...resubmitDates, endDate: e.target.value})}
                        className="w-full px-3 py-2 text-xs border border-blue-300 rounded-lg bg-blue-50 text-slate-700"
                      />
                    </div>
                  </>
                ) : (resubmitRequest.requestType === RequestType.VEHICLE) ? (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase font-mono">Travel Date *</label>
                    <input
                      type="date"
                      required
                      value={resubmitDates.dateNeeded}
                      onChange={e => setResubmitDates({...resubmitDates, dateNeeded: e.target.value})}
                      className="w-full px-3 py-2 text-xs border border-blue-300 rounded-lg bg-blue-50 text-slate-700"
                    />
                  </div>
                ) : (resubmitRequest.requestType === RequestType.ZOOM) ? (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase font-mono">Meeting Date *</label>
                    <input
                      type="date"
                      required
                      value={resubmitDates.meetingDate}
                      onChange={e => setResubmitDates({...resubmitDates, meetingDate: e.target.value})}
                      className="w-full px-3 py-2 text-xs border border-blue-300 rounded-lg bg-blue-50 text-slate-700"
                    />
                  </div>
                ) : null}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Travel Purpose *</label>
                <textarea
                  disabled
                  value={resubmitRequest.purpose || resubmitRequest.reason || ""}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed h-24"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-md cursor-pointer"
                >
                  {loading ? "Submitting..." : "Resubmit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">`;

content = content.replace(target, replacement);

const endTarget = `    </div>
  );
}`;
const endReplacement = `    </div>
    </>
  );
}`;

content = content.replace(endTarget, endReplacement);
fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
