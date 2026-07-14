const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                    const isOverspent = b.budgetUtilized >= (b.budgetAllocation + (b.carryOver || 0));
                    return (
                      <div key={b.id} className="space-y-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-800">{b.department}</span>
                          <span className={\`px-1.5 py-0.5 rounded text-[9px] font-bold \${isOverspent ? "bg-rose-100 text-rose-800 outline outline-1 outline-rose-200 animate-pulse" : "bg-slate-150 text-slate-700"}\`}>
                            {isOverspent ? "OVERSPENT ALERT" : \`\${b.budgetPercentageUsed}% USED\`}
                          </span>
                        </div>
                        
                        {/* Progressive Bar */}
                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={\`h-full rounded-full transition-all duration-500 \${isOverspent ? "bg-rose-500" : b.budgetPercentageUsed > 75 ? "bg-amber-500" : "bg-emerald-500"}\`}
                            style={{ width: \`\${Math.min(b.budgetPercentageUsed, 100)}%\` }}
                          />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                          <span>Spent: {formatCurrency(b.budgetUtilized)}</span>`;

const replacement = `                    const deptYearTxns = yearFilteredTxns.filter(t => (t.department || "").toLowerCase() === b.department.toLowerCase());
                    const obligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
                    const isOverspent = obligations >= (b.budgetAllocation + (b.carryOver || 0));
                    const percentageUsed = Math.round((obligations / Math.max(1, b.budgetAllocation + (b.carryOver || 0))) * 100);
                    return (
                      <div key={b.id} className="space-y-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-800">{b.department}</span>
                          <span className={\`px-1.5 py-0.5 rounded text-[9px] font-bold \${isOverspent ? "bg-rose-100 text-rose-800 outline outline-1 outline-rose-200 animate-pulse" : "bg-slate-150 text-slate-700"}\`}>
                            {isOverspent ? "OVERSPENT ALERT" : \`\${percentageUsed}% USED\`}
                          </span>
                        </div>
                        
                        {/* Progressive Bar */}
                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={\`h-full rounded-full transition-all duration-500 \${isOverspent ? "bg-rose-500" : percentageUsed > 75 ? "bg-amber-500" : "bg-emerald-500"}\`}
                            style={{ width: \`\${Math.min(percentageUsed, 100)}%\` }}
                          />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                          <span>Spent: {formatCurrency(obligations)}</span>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched 803");
