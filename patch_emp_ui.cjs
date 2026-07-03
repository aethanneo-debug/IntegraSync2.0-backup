const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

const replacement = `                      <div className="flex flex-col items-end space-y-2">
                        <span className={\`text-[9px] font-semibold font-mono px-2 py-0.5 rounded-full \${
                          r.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : r.status === "Rejected"
                            ? "bg-rose-50 text-rose-600 border border-rose-100"
                            : r.status === "Returned by HR" || r.status === "Returned by Division Chief"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                        }\`}>
                          {r.status}
                        </span>
                        {r.status === "Rejected" && (
                          <button
                            onClick={() => {
                              setResubmitRequest(r);
                              setResubmitDates({
                                dateRequested: r.dateRequested || "",
                                startDate: r.startDate || "",
                                endDate: r.endDate || "",
                                dateNeeded: r.dateNeeded || "",
                                meetingDate: r.meetingDate || ""
                              });
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded hover:bg-blue-700 shadow-sm transition-colors"
                          >
                            Resubmit Request
                          </button>
                        )}
                      </div>`;

content = content.replace(
  `                      <div>
                        <span className={\`text-[9px] font-semibold font-mono px-2 py-0.5 rounded-full \${
                          r.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : r.status === "Rejected"
                            ? "bg-rose-50 text-rose-600 border border-rose-100"
                            : r.status === "Returned by HR" || r.status === "Returned by Division Chief"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                        }\`}>
                          {r.status}
                        </span>
                      </div>`, replacement);

fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
