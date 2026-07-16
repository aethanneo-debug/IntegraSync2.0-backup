const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const targetToRemove = `                {/* INLINE SQUEEZED FORM TO CREATE AN ALLOCATION */}
                {isAddBudgetOpen ? (
                  <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">Create New Program/Division Budget</h3>
                      <button onClick={() => setIsAddBudgetOpen(false)} className="text-slate-400 hover:text-slate-950 font-bold text-xs">✕ Close Form</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Program / Division Name</label>
                        <select
                          value={addBudgetForm.department}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, department: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold"
                        >
                          <option value="Adjudication Division">Adjudication Division</option>
                          <option value="Administrative and Finance Division">Administrative and Finance Division</option>
                          <option value="Legal Division">Legal Division</option>
                          <option value="Information and Communications Division">Information and Communications Division</option>
                          <option value="Executive Management Office">Executive Management Office</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Personnel Services (PS)</label>
                        <input
                          type="number"
                          placeholder="e.g. 750000"
                          value={addBudgetForm.ps}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, ps: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Maint. & Other Op. Exp. (MOOE)</label>
                        <input
                          type="number"
                          placeholder="e.g. 500000"
                          value={addBudgetForm.mooe}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, mooe: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Capital Outlays (CO)</label>
                        <input
                          type="number"
                          placeholder="e.g. 200000"
                          value={addBudgetForm.co}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, co: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        const ps = Number(addBudgetForm.ps) || 0;
                        const mooe = Number(addBudgetForm.mooe) || 0;
                        const co = Number(addBudgetForm.co) || 0;
                        const val = ps + mooe + co;
                        if (val <= 0) return alert("Total Allocation amount must be greater than zero");
                        
                        const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                        const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                        const approved = hb ? hb.approvedBudget : 0;
                        
                        const otherBudgetsSum = budgets.reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                        if (val + otherBudgetsSum > approved) {
                          alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ".");
                          return;
                        }

                        handleCreateBudget(addBudgetForm.department, ps, mooe, co);
                        setIsAddBudgetOpen(false);
                        setAddBudgetForm({ department: "Adjudication Division", ps: "", mooe: "", co: "" });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-mono text-xs px-4 py-2 font-bold shadow-sm"
                    >
                      Initialize Budget Allocation
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 italic">Review division fund caps and real-time obligation burns.</p>
                    <button
                      onClick={() => setIsAddBudgetOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-[11px] px-3 py-1.5 rounded-lg flex items-center space-x-1 font-bold shadow-sm cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Create Budget Allocation</span>
                    </button>
                  </div>
                )}`;

code = code.replace(targetToRemove, `                {/* INLINE SQUEEZED FORM TO CREATE AN ALLOCATION (REMOVED) */}
                <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 italic">Review division fund caps and real-time obligation burns.</p>
                </div>`);

fs.writeFileSync('src/components/FinanceView.tsx', code);
