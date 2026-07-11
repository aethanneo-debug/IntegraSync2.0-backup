const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace(
  /const data = activeBudgets\.map/g,
  'const data = budgets.map'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
