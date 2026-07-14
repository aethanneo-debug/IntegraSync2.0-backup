const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target1 = `                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Total Expenditures:</span>
                              <span className="font-semibold text-slate-700">{formatCurrency(b.budgetUtilized)}</span>
                            </div>`;

const replacement1 = `                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Total Expenditures:</span>
                              <span className="font-semibold text-slate-700">{formatCurrency(obligations)}</span>
                            </div>`;


const target2 = `                          <div className="flex justify-between items-center text-[11px]">
                                                        <span className="font-semibold text-slate-500">Fund-Utilization Status:</span>
                            <span className="font-black text-slate-800">{b.budgetPercentageUsed}% spent</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={\`h-full rounded-full \${isOverspent ? 'bg-rose-500' : 'bg-blue-600'}\`} 
                              style={{ width: \`\${Math.min(b.budgetPercentageUsed, 100)}%\` }}
                            ></div>`;

const replacement2 = `                          <div className="flex justify-between items-center text-[11px]">
                                                        <span className="font-semibold text-slate-500">Fund-Utilization Status:</span>
                            <span className="font-black text-slate-800">{Math.round((obligations / Math.max(1, b.budgetAllocation + (b.carryOver || 0))) * 100)}% spent</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={\`h-full rounded-full \${obligations >= (b.budgetAllocation + (b.carryOver || 0)) ? 'bg-rose-500' : 'bg-blue-600'}\`} 
                              style={{ width: \`\${Math.min(Math.round((obligations / Math.max(1, b.budgetAllocation + (b.carryOver || 0))) * 100), 100)}%\` }}
                            ></div>`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched values!");
