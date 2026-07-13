const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                          {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && (
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                              <button
                                onClick={() => {
                                  const newCap = prompt("Enter new Budget Fund Pool Cap for " + b.department + ":", b.budgetAllocation.toString());
                                  if (newCap !== null && !isNaN(Number(newCap))) {
                                    apiCall("/api/budgets/" + b.id, {
                                      method: "PUT",
                                      body: JSON.stringify({ budgetAllocation: Number(newCap) })
                                    }).then(res => {
                                      if(res.status === "success") {
                                        setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg));
                                      }
                                    });
                                  }
                                }}
                                className="text-[10px] uppercase font-mono tracking-wider text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 cursor-pointer font-bold border"
                              >
                                Set Budget Fund Pool Cap
                              </button>
                            </div>
                          )}`;

const replacement = `                          {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && (
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

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
