const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 italic">Review division fund caps and real-time obligation burns.</p>
                    {isBudgetOrAdmin && (
                      <button
                        onClick={() => setIsAddBudgetOpen(true)}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-[11px] px-3 py-1.5 rounded-lg flex items-center space-x-1 font-bold shadow-sm cursor-pointer"
                      >
                        <Plus size={13} />
                        <span>Add New Budget Program</span>
                      </button>
                    )}
                  </div>
                )}`;

const replacement = `                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 italic">Review division fund caps and real-time obligation burns.</p>
                  </div>
                )}`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Successfully removed button");
