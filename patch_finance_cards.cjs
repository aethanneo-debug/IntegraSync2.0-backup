const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const tgtCard = `                          <div className="pt-4 space-y-2 border-t mt-3 border-slate-100">
                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Base Allotment:</span>
                              <span className="font-bold text-slate-900">{formatCurrency(b.budgetAllocation)}</span>
                            </div>`;

const replCard = `                          <div className="pt-4 space-y-2 border-t mt-3 border-slate-100">
                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Base Allotment:</span>
                              <span className="font-bold text-slate-900">{formatCurrency(b.budgetAllocation)}</span>
                            </div>
                            <div className="pl-3 border-l-2 border-blue-100 space-y-1 my-1">
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

code = code.replace(tgtCard, replCard);
fs.writeFileSync('src/components/FinanceView.tsx', code);
console.log("FinanceView cards patched.");
