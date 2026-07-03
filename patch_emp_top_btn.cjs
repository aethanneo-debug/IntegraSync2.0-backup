const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

const target = `<h2 className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">My Filed Requests Ledger</h2>`;
const replacement = `<div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">My Filed Requests Ledger</h2>
                <button
                  onClick={() => {
                    const rejectedReqs = requests.filter(r => r.status === "Rejected");
                    if (rejectedReqs.length > 0) {
                      const r = rejectedReqs[0];
                      setResubmitRequest(r);
                      setResubmitDates({
                        dateRequested: r.dateRequested || "",
                        startDate: r.startDate || "",
                        endDate: r.endDate || "",
                        dateNeeded: r.dateNeeded || "",
                        meetingDate: r.meetingDate || ""
                      });
                    } else {
                      alert("You have no rejected requests to resubmit.");
                    }
                  }}
                  className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
                >
                  Resubmit Rejected Request
                </button>
              </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
