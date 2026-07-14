const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `              <div className="flex gap-2">
                <button
                  onClick={exportMethods.budgets}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-lg text-xs font-semibold flex items-center shadow-sm cursor-pointer"
                >
                  <Download size={13} className="mr-1.5 text-blue-400" />
                  <span>Export Database</span>
                </button>
              </div>`;

const replacement = `              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFiscalYearModalOpen(true)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-[10px] font-bold py-2 px-3 uppercase tracking-wider rounded-lg border flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <Calendar size={13} />
                  <span>FY {activeFiscalYear} ACTIVE</span>
                </button>
                <button
                  onClick={exportMethods.budgets}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-lg text-xs font-semibold flex items-center shadow-sm cursor-pointer"
                >
                  <Download size={13} className="mr-1.5 text-blue-400" />
                  <span>Export Database</span>
                </button>
              </div>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Successfully patched FinanceView budgets button");
