const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

const targetRow = `                        </span>
                        
                      </div>
                    </div>`;

const replacementRow = `                        </span>
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
                            className="mt-2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
                          >
                            Resubmit
                          </button>
                        )}
                      </div>
                    </div>`;

content = content.replace(targetRow, replacementRow);
fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
