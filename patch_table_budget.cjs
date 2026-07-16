const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const filterRegex = /\{\/\* DIVISION FILTER BUTTONS.*?<\/div>/s;
code = code.replace(filterRegex, '');

const cardsRegex = /\{\/\* DETAILED MONITORING CARDS.*?<\/div>\s*<\/div>\s*\{\/\* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES \*\//s;

const tableReplacement = `                {/* BUDGET MONITORING TABLE */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-mono tracking-wider text-slate-500">
                          <th className="p-3 font-bold">Division / Department</th>
                          <th className="p-3 font-bold text-right">Personnel Services (PS)</th>
                          <th className="p-3 font-bold text-right">Maint. & Other Op. Exp. (MOOE)</th>
                          <th className="p-3 font-bold text-right">Capital Outlays (CO)</th>
                          <th className="p-3 font-bold text-right">Total Base Allocation</th>
                          <th className="p-3 font-bold text-right">Spent / Obligated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {["Adjudication Division", "Administrative and Finance Division", "Legal Division", "Information and Communications Division", "Executive Management Office"].map(div => {
                          const b = budgets.find(bg => bg.department === div);
                          
                          const deptYearTxns = yearFilteredTxns.filter(t => (t.department || "").toLowerCase() === div.toLowerCase());
                          const txObligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
                          const totalPayroll = employees.filter(e => (e.division || "").toLowerCase() === div.toLowerCase()).reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
                          const obligations = txObligations + totalPayroll;
                          
                          const id = b ? b.id : null;
                          const ps = b ? (b.allocatedPS || 0) : 0;
                          const mooe = b ? (b.allocatedMOOE || 0) : 0;
                          const co = b ? (b.allocatedCO || 0) : 0;
                          const totalBase = ps + mooe + co;
                          const carryOver = b ? (b.carryOver || 0) : 0;
                          const activeCap = totalBase + carryOver;
                          const isOverspent = obligations >= Math.max(1, activeCap);

                          const handleBlur = async (field, value) => {
                            const numVal = Number(value) || 0;
                            let newPs = ps;
                            let newMooe = mooe;
                            let newCo = co;
                            if (field === 'ps') newPs = numVal;
                            if (field === 'mooe') newMooe = numVal;
                            if (field === 'co') newCo = numVal;
                            
                            const val = newPs + newMooe + newCo;
                            const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                            const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                            const approved = hb ? hb.approvedBudget : 0;
                            
                            const otherBudgetsSum = budgets.filter(bg => bg.department !== div).reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                            if (val + otherBudgetsSum > approved) {
                              alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ". Reverting changes.");
                              fetchFinanceAddons();
                              return;
                            }

                            if (id) {
                              apiCall("/api/budgets/" + id, {
                                method: "PUT",
                                body: JSON.stringify({ budgetAllocation: val, allocatedPS: newPs, allocatedMOOE: newMooe, allocatedCO: newCo })
                              }).then(res => { if(res.status === 'success') setBudgets(budgets.map(bg => bg.id === id ? res.data : bg)); });
                            } else {
                              apiCall("/api/finance/budgets", {
                                method: "POST",
                                body: JSON.stringify({ department: div, allocatedPS: newPs, allocatedMOOE: newMooe, allocatedCO: newCo })
                              }).then(res => { if(res.status === 'success') fetchFinanceAddons(); });
                            }
                          };

                          return (
                            <tr key={div} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-3 text-xs font-bold text-slate-800">
                                {div}
                                {isOverspent && obligations > 0 && <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-800 outline outline-1 outline-rose-200 animate-pulse">OVERSPENT</span>}
                              </td>
                              <td className="p-3 text-right">
                                {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) ? (
                                  <input 
                                    type="number" 
                                    className="w-24 text-right p-1.5 text-xs font-mono bg-white border border-slate-200 rounded outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    defaultValue={ps}
                                    onBlur={(e) => handleBlur('ps', e.target.value)}
                                  />
                                ) : (
                                  <span className="text-xs font-mono text-slate-600">{formatCurrency(ps)}</span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) ? (
                                  <input 
                                    type="number" 
                                    className="w-24 text-right p-1.5 text-xs font-mono bg-white border border-slate-200 rounded outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    defaultValue={mooe}
                                    onBlur={(e) => handleBlur('mooe', e.target.value)}
                                  />
                                ) : (
                                  <span className="text-xs font-mono text-slate-600">{formatCurrency(mooe)}</span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) ? (
                                  <input 
                                    type="number" 
                                    className="w-24 text-right p-1.5 text-xs font-mono bg-white border border-slate-200 rounded outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    defaultValue={co}
                                    onBlur={(e) => handleBlur('co', e.target.value)}
                                  />
                                ) : (
                                  <span className="text-xs font-mono text-slate-600">{formatCurrency(co)}</span>
                                )}
                              </td>
                              <td className="p-3 text-right text-xs font-black text-slate-900 font-mono">
                                {formatCurrency(totalBase)}
                              </td>
                              <td className="p-3 text-right text-xs font-semibold text-slate-700 font-mono">
                                {formatCurrency(obligations)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES */}`;

code = code.replace(cardsRegex, tableReplacement);

fs.writeFileSync('src/components/FinanceView.tsx', code);
