const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                          {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && hb && (
                            <button
                              onClick={() => {
                                const newAppr = prompt("Enter new Approved Budget for " + activeFiscalYear + ":", approved.toString());
                                if (newAppr !== null && !isNaN(Number(newAppr))) {
                                  apiCall("/api/hsac-budgets/" + hb.id, {
                                    method: "PUT",
                                    body: JSON.stringify({ approvedBudget: Number(newAppr) })
                                  }).then(res => {
                                    if(res.status === "success") {
                                      setHsacBudgets(hsacBudgets.map(b => b.id === hb.id ? res.data : b));
                                      fetchFinanceAddons();
                                    }
                                  });
                                }
                              }}
                              className="text-[10px] uppercase font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 cursor-pointer"
                            >
                              Edit Budget
                            </button>
                          )}`;

const replacement = `                          {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && hb && (
                            editingHsacBudgetId === hb.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={newHsacApprVal}
                                  onChange={(e) => setNewHsacApprVal(e.target.value)}
                                  className="w-24 text-xs font-mono p-1 border rounded"
                                  autoFocus
                                />
                                <button
                                  onClick={() => {
                                    const val = Number(newHsacApprVal);
                                    if (!isNaN(val)) {
                                      apiCall("/api/hsac-budgets/" + hb.id, {
                                        method: "PUT",
                                        body: JSON.stringify({ approvedBudget: val })
                                      }).then(res => {
                                        if (res.status === "success") {
                                          setHsacBudgets(hsacBudgets.map(b => b.id === hb.id ? res.data : b));
                                          fetchFinanceAddons();
                                        }
                                        setEditingHsacBudgetId(null);
                                      });
                                    } else {
                                      setEditingHsacBudgetId(null);
                                    }
                                  }}
                                  className="text-[10px] uppercase font-bold text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingHsacBudgetId(null)}
                                  className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingHsacBudgetId(hb.id);
                                  setNewHsacApprVal(approved.toString());
                                }}
                                className="text-[10px] uppercase font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 cursor-pointer"
                              >
                                Edit Budget
                              </button>
                            )
                          )}`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
