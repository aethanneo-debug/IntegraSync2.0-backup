const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                              user.role === UserRole.SUPER_ADMIN ? (
                                <div className="flex gap-1.5 justify-center">
                                  <button
                                    onClick={() => handleActionBudgetRequest(req.id, "Approved")}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded text-[10px] cursor-pointer"
                                  >
                                    Approve & Allot
                                  </button>
                                  <button
                                    onClick={() => {
                                      const rem = prompt("State reasons for return / realignment rejection:");
                                      if (rem !== null) handleActionBudgetRequest(req.id, "Returned", rem);
                                    }}
                                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-1 rounded text-[10px] cursor-pointer"
                                  >
                                    Return & Reject
                                  </button>
                                </div>
                              ) : (`;

const replacement = `                              user.role === UserRole.SUPER_ADMIN ? (
                                rejectingRequestId === req.id ? (
                                  <div className="flex flex-col items-center gap-1">
                                    <input
                                      type="text"
                                      placeholder="Reason..."
                                      value={rejectReason}
                                      onChange={(e) => setRejectReason(e.target.value)}
                                      className="w-24 text-[10px] font-mono p-1 border border-rose-300 rounded"
                                      autoFocus
                                    />
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => {
                                          if (rejectReason.trim()) {
                                            handleActionBudgetRequest(req.id, "Returned", rejectReason.trim());
                                            setRejectingRequestId(null);
                                            setRejectReason("");
                                          }
                                        }}
                                        className="bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded cursor-pointer"
                                      >
                                        Confirm
                                      </button>
                                      <button
                                        onClick={() => {
                                          setRejectingRequestId(null);
                                          setRejectReason("");
                                        }}
                                        className="bg-slate-200 text-slate-700 text-[9px] px-1.5 py-0.5 rounded cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex gap-1.5 justify-center">
                                    <button
                                      onClick={() => handleActionBudgetRequest(req.id, "Approved")}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded text-[10px] cursor-pointer"
                                    >
                                      Approve & Allot
                                    </button>
                                    <button
                                      onClick={() => {
                                        setRejectingRequestId(req.id);
                                        setRejectReason("");
                                      }}
                                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-1 rounded text-[10px] cursor-pointer"
                                    >
                                      Return & Reject
                                    </button>
                                  </div>
                                )
                              ) : (`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
