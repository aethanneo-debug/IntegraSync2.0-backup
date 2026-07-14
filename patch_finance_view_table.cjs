const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// Update the headers in the PAP Class table
content = content.replace(
  '<th className="p-3 text-right">Approved Allotment</th>',
  '<th className="p-3 text-right">Approved Base Allotment</th>\n                                 <th className="p-3 text-right">Retained Surplus (Carryover)</th>\n                                 <th className="p-3 text-right">Total Active Allotment</th>'
);

// Update the row cells in the PAP Class table
content = content.replace(
  /<td className="p-3 text-right font-bold">{formatCurrency\(b.budgetAllocation\)}<\/td>/,
  '<td className="p-3 text-right font-bold">{formatCurrency(b.budgetAllocation)}</td>\n                                     <td className="p-3 text-right font-semibold text-teal-700">{formatCurrency(b.carryOver || 0)}</td>\n                                     <td className="p-3 text-right font-bold text-blue-700">{formatCurrency(b.budgetAllocation + (b.carryOver || 0))}</td>'
);

// Update remAllotment calculation in the loop
content = content.replace(
  'const remAllotment = b.budgetAllocation - obligations - unliquidated;',
  'const remAllotment = b.budgetAllocation + (b.carryOver || 0) - obligations - unliquidated;'
);

// Update percentage utilized calculation
content = content.replace(
  '{Math.round((obligations / b.budgetAllocation) * 100)}% utilized',
  '{Math.round((obligations / (b.budgetAllocation + (b.carryOver || 0))) * 100)}% utilized'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Successfully patched FinanceView table");
