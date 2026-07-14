const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// Update availableBalance in card
content = content.replace(
  'const availableBalance = b.budgetAllocation - obligations;',
  'const availableBalance = b.budgetAllocation + (b.carryOver || 0) - obligations;'
);

// Update isOverspent
content = content.replace(
  'const isOverspent = b.budgetUtilized >= b.budgetAllocation;',
  'const isOverspent = b.budgetUtilized >= (b.budgetAllocation + (b.carryOver || 0));'
);

// Add carryover row
const targetHtml = `                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Allotment / Cap:</span>
                              <span className="font-bold text-slate-900">{formatCurrency(b.budgetAllocation)}</span>
                            </div>`;
                            
const replacementHtml = `                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Base Allotment:</span>
                              <span className="font-bold text-slate-900">{formatCurrency(b.budgetAllocation)}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Retained Carryover:</span>
                              <span className="font-bold text-teal-700">{formatCurrency(b.carryOver || 0)}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-mono text-slate-800 bg-slate-50 p-1 rounded">
                              <span className="font-bold">Total Active Cap:</span>
                              <span className="font-black text-blue-700">{formatCurrency(b.budgetAllocation + (b.carryOver || 0))}</span>
                            </div>`;

content = content.replace(targetHtml, replacementHtml);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Successfully patched FinanceView cards");
