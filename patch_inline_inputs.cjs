const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const targetInputs = `                            <div className="pl-3 border-l-2 border-blue-100 space-y-1 my-1">
                              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                <span>- PS:</span>
                                <span>{formatCurrency(b.allocatedPS || 0)}</span>
                              </div>
                              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                <span>- MOOE:</span>
                                <span>{formatCurrency(b.allocatedMOOE || 0)}</span>
                              </div>
                              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                <span>- CO:</span>
                                <span>{formatCurrency(b.allocatedCO || 0)}</span>
                              </div>
                            </div>`;

const replacementInputs = `                            <div className="pl-3 border-l-2 border-blue-100 space-y-2 my-2">
                              {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) ? (
                                <>
                                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                                    <span>- PS:</span>
                                    <input 
                                      type="number" 
                                      className="w-24 text-right p-1 bg-white border border-slate-200 rounded outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                      value={b.allocatedPS || ""}
                                      onChange={(e) => setBudgets(budgets.map(bg => bg.id === b.id ? { ...bg, allocatedPS: Number(e.target.value) || 0 } : bg))}
                                      onBlur={() => {
                                        const val = (b.allocatedPS || 0) + (b.allocatedMOOE || 0) + (b.allocatedCO || 0);
                                        apiCall("/api/budgets/" + b.id, {
                                          method: "PUT",
                                          body: JSON.stringify({ budgetAllocation: val, allocatedPS: b.allocatedPS, allocatedMOOE: b.allocatedMOOE, allocatedCO: b.allocatedCO })
                                        }).then(res => { if(res.status === 'success') setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg)); });
                                      }}
                                    />
                                  </div>
                                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                                    <span>- MOOE:</span>
                                    <input 
                                      type="number" 
                                      className="w-24 text-right p-1 bg-white border border-slate-200 rounded outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                      value={b.allocatedMOOE || ""}
                                      onChange={(e) => setBudgets(budgets.map(bg => bg.id === b.id ? { ...bg, allocatedMOOE: Number(e.target.value) || 0 } : bg))}
                                      onBlur={() => {
                                        const val = (b.allocatedPS || 0) + (b.allocatedMOOE || 0) + (b.allocatedCO || 0);
                                        apiCall("/api/budgets/" + b.id, {
                                          method: "PUT",
                                          body: JSON.stringify({ budgetAllocation: val, allocatedPS: b.allocatedPS, allocatedMOOE: b.allocatedMOOE, allocatedCO: b.allocatedCO })
                                        }).then(res => { if(res.status === 'success') setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg)); });
                                      }}
                                    />
                                  </div>
                                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                                    <span>- CO:</span>
                                    <input 
                                      type="number" 
                                      className="w-24 text-right p-1 bg-white border border-slate-200 rounded outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                      value={b.allocatedCO || ""}
                                      onChange={(e) => setBudgets(budgets.map(bg => bg.id === b.id ? { ...bg, allocatedCO: Number(e.target.value) || 0 } : bg))}
                                      onBlur={() => {
                                        const val = (b.allocatedPS || 0) + (b.allocatedMOOE || 0) + (b.allocatedCO || 0);
                                        apiCall("/api/budgets/" + b.id, {
                                          method: "PUT",
                                          body: JSON.stringify({ budgetAllocation: val, allocatedPS: b.allocatedPS, allocatedMOOE: b.allocatedMOOE, allocatedCO: b.allocatedCO })
                                        }).then(res => { if(res.status === 'success') setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg)); });
                                      }}
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                    <span>- PS:</span>
                                    <span>{formatCurrency(b.allocatedPS || 0)}</span>
                                  </div>
                                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                    <span>- MOOE:</span>
                                    <span>{formatCurrency(b.allocatedMOOE || 0)}</span>
                                  </div>
                                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                    <span>- CO:</span>
                                    <span>{formatCurrency(b.allocatedCO || 0)}</span>
                                  </div>
                                </>
                              )}
                            </div>`;

code = code.replace(targetInputs, replacementInputs);

// Now remove the "Set Budget Fund Pool Cap" block at the bottom:
const setCapBlockTarget = `                          {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && (
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                              {editingBudgetCapId === b.id ? (
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
                              )}
                            </div>
                          )}`;
                          
code = code.replace(setCapBlockTarget, "");

fs.writeFileSync('src/components/FinanceView.tsx', code);
