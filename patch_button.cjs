const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const tgt = `                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 italic">Review division fund caps and real-time obligation burns.</p>
                  </div>
                )}`;

const rep = `                ) : (
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

code = code.replace(tgt, rep);
fs.writeFileSync('src/components/FinanceView.tsx', code);
