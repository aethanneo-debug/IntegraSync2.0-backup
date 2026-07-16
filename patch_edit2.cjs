const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const tgt1 = `                            {editingBudgetCapId === b.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={newBudgetCapVal}
                                  onChange={(e) => setNewBudgetCapVal(e.target.value)}
                                  className="w-32 text-xs font-mono p-1 border rounded"
                                  autoFocus
                                />
                                <button
                                  onClick={() => {
                                    const val = Number(newBudgetCapVal);
                                    if (!isNaN(val)) {
                                      const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                                      const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                                      const approved = hb ? hb.approvedBudget : 0;
                                      
                                      const otherBudgetsSum = budgets.filter(bg => bg.id !== b.id).reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                                      if (val + otherBudgetsSum > approved) {
                                        alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ".");
                                        return;
                                      }
                                      
                                      apiCall("/api/budgets/" + b.id, {
                                        method: "PUT",
                                        body: JSON.stringify({ budgetAllocation: val })
                                      }).then(res => {
                                        if (res.status === "success") {
                                          setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg));
                                        }
                                        setEditingBudgetCapId(null);
                                      });
                                    } else {
                                      setEditingBudgetCapId(null);
                                    }
                                  }}
                                  className="text-[10px] uppercase font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-900"
                                >
                                  Save Cap
                                </button>
                                <button
                                  onClick={() => setEditingBudgetCapId(null)}
                                  className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingBudgetCapId(b.id);
                                  setNewBudgetCapVal(b.budgetAllocation.toString());
                                }}
                                className="text-[10px] uppercase font-mono tracking-wider text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 cursor-pointer font-bold border"
                              >
                                Set Budget Fund Pool Cap
                              </button>
                            )}`;

const repl1 = `                            {editingBudgetCapId === b.id ? (
                              <div className="flex flex-col space-y-2 w-full mt-2">
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">PS</label>
                                    <input type="number" value={editingBudgetBreakdown.ps} onChange={e => setEditingBudgetBreakdown({...editingBudgetBreakdown, ps: e.target.value})} className="w-full text-xs font-mono p-1.5 border rounded bg-white" placeholder="PS" />
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">MOOE</label>
                                    <input type="number" value={editingBudgetBreakdown.mooe} onChange={e => setEditingBudgetBreakdown({...editingBudgetBreakdown, mooe: e.target.value})} className="w-full text-xs font-mono p-1.5 border rounded bg-white" placeholder="MOOE" />
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">CO</label>
                                    <input type="number" value={editingBudgetBreakdown.co} onChange={e => setEditingBudgetBreakdown({...editingBudgetBreakdown, co: e.target.value})} className="w-full text-xs font-mono p-1.5 border rounded bg-white" placeholder="CO" />
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2 pt-1">
                                  <button
                                    onClick={() => setEditingBudgetCapId(null)}
                                    className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      const ps = Number(editingBudgetBreakdown.ps) || 0;
                                      const mooe = Number(editingBudgetBreakdown.mooe) || 0;
                                      const co = Number(editingBudgetBreakdown.co) || 0;
                                      const val = ps + mooe + co;
                                      if (val <= 0) return alert("Total Allocation must be > 0");
                                      
                                      const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                                      const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                                      const approved = hb ? hb.approvedBudget : 0;
                                      
                                      const otherBudgetsSum = budgets.filter(bg => bg.id !== b.id).reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                                      if (val + otherBudgetsSum > approved) {
                                        alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ".");
                                        return;
                                      }
                                      
                                      apiCall("/api/budgets/" + b.id, {
                                        method: "PUT",
                                        body: JSON.stringify({ budgetAllocation: val, allocatedPS: ps, allocatedMOOE: mooe, allocatedCO: co })
                                      }).then(res => {
                                        if (res.status === "success") {
                                          setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg));
                                        }
                                        setEditingBudgetCapId(null);
                                      });
                                    }}
                                    className="text-[10px] uppercase font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-900"
                                  >
                                    Save Cap
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingBudgetCapId(b.id);
                                  setEditingBudgetBreakdown({ ps: String(b.allocatedPS || 0), mooe: String(b.allocatedMOOE || 0), co: String(b.allocatedCO || 0) });
                                }}
                                className="text-[10px] uppercase font-mono tracking-wider text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 cursor-pointer font-bold border"
                              >
                                Set Budget Fund Pool Cap
                              </button>
                            )}`;

code = code.split(tgt1).join(repl1);
fs.writeFileSync('src/components/FinanceView.tsx', code);
