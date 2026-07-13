const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `{innerBudgetTab === "allocations" && (
              <div className="space-y-6">
                
                {/* INLINE SQUEEZED FORM TO CREATE AN ALLOCATION */}`;

const replacement = `{innerBudgetTab === "allocations" && (
              <div className="space-y-6">
                {(() => {
                  const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                  const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                  const approved = hb ? hb.approvedBudget : 0;
                  const carry = hb ? (hb.carryOverBudget || 0) : 0;
                  const totalAvail = approved + carry;
                  const util = hb ? (hb.totalUtilized || 0) : 0;
                  const remaining = totalAvail - util;
                  const utilPct = totalAvail > 0 ? (util / totalAvail) * 100 : 0;

                  return (
                    <div className="bg-white border rounded-2xl p-5 shadow-sm mb-6 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-extrabold uppercase text-slate-800 font-mono tracking-wider">HSAC Total Budget ({activeFiscalYear})</h3>
                          {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && hb && (
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
                                    }
                                  });
                                }
                              }}
                              className="text-[10px] uppercase font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 cursor-pointer"
                            >
                              Edit Budget
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-slate-50 border rounded-xl p-4">
                            <p className="text-[10px] uppercase font-mono text-slate-500 font-bold mb-1">Total Approved</p>
                            <p className="text-lg font-black text-slate-800">{formatCurrency(approved)}</p>
                          </div>
                          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                            <p className="text-[10px] uppercase font-mono text-amber-700 font-bold mb-1">Carryover</p>
                            <p className="text-lg font-black text-amber-900">{formatCurrency(carry)}</p>
                          </div>
                          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <p className="text-[10px] uppercase font-mono text-blue-700 font-bold mb-1">Total Available</p>
                            <p className="text-lg font-black text-blue-900">{formatCurrency(totalAvail)}</p>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                            <p className="text-[10px] uppercase font-mono text-emerald-700 font-bold mb-1">Total Utilized</p>
                            <p className="text-lg font-black text-emerald-900">{formatCurrency(util)}</p>
                          </div>
                        </div>

                        <div className="bg-slate-100 rounded-full h-3 overflow-hidden border">
                          <div className="bg-blue-600 h-full" style={{ width: \`\${Math.min(utilPct, 100)}%\` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                          <span>{utilPct.toFixed(1)}% Used</span>
                          <span className="text-blue-700">Remaining: {formatCurrency(remaining)}</span>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 h-48">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Carryover (Prev FY)', value: carry },
                                  { name: 'Approved (Current FY)', value: approved }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={70}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                <Cell fill="#f59e0b" />
                                <Cell fill="#3b82f6" />
                              </Pie>
                              <Tooltip formatter={(value) => formatCurrency(value as number)} />
                              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                            </PieChart>
                          </ResponsiveContainer>
                      </div>
                    </div>
                  );
                })()}
                
                {/* INLINE SQUEEZED FORM TO CREATE AN ALLOCATION */}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Total Budget UI added");
} else {
    console.log("Target not found!");
}
