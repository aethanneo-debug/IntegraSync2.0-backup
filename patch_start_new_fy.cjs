const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target1 = `<Calendar size={11} />
                <span>FY {activeFiscalYear} ACTIVE</span>
              </button>`;

const replacement1 = `<Calendar size={11} />
                <span>FY {activeFiscalYear} ACTIVE</span>
              </button>
              {isBudgetOrAdmin && (
                <button 
                  onClick={() => handleStartNewFiscalYear()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold py-1.5 px-2.5 uppercase tracking-wider rounded-lg border flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={11} />
                  <span>Start New Fiscal Year</span>
                </button>
              )}`;

const target2 = `<Calendar size={13} />
                  <span>FY {activeFiscalYear} ACTIVE</span>
                </button>`;

const replacement2 = `<Calendar size={13} />
                  <span>FY {activeFiscalYear} ACTIVE</span>
                </button>
                {isBudgetOrAdmin && (
                  <button 
                    onClick={() => handleStartNewFiscalYear()}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-[10px] font-bold py-2 px-3 uppercase tracking-wider rounded-lg border flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                  >
                    <Plus size={13} />
                    <span>Start New Fiscal Year</span>
                  </button>
                )}`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched FinanceView.tsx");
