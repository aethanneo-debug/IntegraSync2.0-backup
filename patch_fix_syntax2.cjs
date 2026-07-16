const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const replacement = `                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                          <span>Spent: {formatCurrency(obligations)}</span>
                          <span>Allocation: {formatCurrency(b.budgetAllocation)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES */}`;

// Let's replace by finding the index
const searchStr = `                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                          <span>Spent: {formatCurrency(obligations)}</span>
                          <span>Allocation: {formatCurrency(b.budgetAllocation)}</span>
                        </div>
                </div>
              </div>
              {/* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES */}`;

if (code.includes(searchStr)) {
    code = code.replace(searchStr, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', code);
    console.log("Success exact");
} else {
    // maybe different whitespace
    const r = /<div className="flex justify-between items-center text-\[10px\] font-mono text-slate-500">\s*<span>Spent: \{formatCurrency\(obligations\)\}<\/span>\s*<span>Allocation: \{formatCurrency\(b\.budgetAllocation\)\}<\/span>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES \*\//;
    code = code.replace(r, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', code);
    console.log("Success regex");
}
