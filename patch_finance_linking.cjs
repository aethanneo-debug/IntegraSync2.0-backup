const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// Replace the liquidations map for linking
content = content.replace(
  '                        {liquidations.map((l) => (\\n                          <option key={l.id} value={l.id}>\\n                            {l.liquidationNo} - {l.employee} ({formatCurrency(l.amountReleased || l.amountLiquidated)} released)\\n                          </option>\\n                        ))}',
  '{submissions.filter(s => s.status === "Completed").map((l) => (\\n                          <option key={l.id} value={l.id}>\\n                            {l.submissionNo} - {l.employeeName} ({formatCurrency(l.totalReleased)} released)\\n                          </option>\\n                        ))}'
);

content = content.replace(
  '{liquidations.map((l) => (',
  '{submissions.filter(s => s.status === "Completed").map((l) => ('
);

content = content.replace(
  '{l.liquidationNo} - {l.employee} ({formatCurrency(l.amountReleased || l.amountLiquidated)} released)',
  '{l.submissionNo} - {l.employeeName} ({formatCurrency(l.totalReleased)} released)'
);

// Replace the logic inside onClick
content = content.replace(
  'const liq = liquidations.find(l => l.id === selectedLinkingLiqId);',
  'const liq = submissions.find(l => l.id === selectedLinkingLiqId);'
);

content = content.replace(
  'const amountVal = liq.amountReleased || liq.amountLiquidated || 15000.00;',
  'const amountVal = liq.totalReleased || liq.totalSpent || 0;'
);

content = content.replace(
  'liquidationNo: liq.liquidationNo,',
  'liquidationNo: liq.submissionNo,'
);

content = content.replace(
  'employee: liq.employee,',
  'employee: liq.employeeName,'
);

content = content.replace(
  'alert(`Activity ${liq.liquidationNo} successfully mapped to budget ${bud.department}!`);',
  'alert(`Activity ${liq.submissionNo} successfully mapped to budget ${bud.department}!`);'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
