const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace(
  'const totalBudgetUtilizedSum = budgets.reduce((acc, b) => acc + b.budgetUtilized, 0);',
  'const totalBudgetUtilizedSum = yearFilteredTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);'
);

const target1704 = 'const util = budgets.reduce((acc, b) => acc + (b.budgetUtilized || 0), 0);';
const replacement1704 = 'const util = yearFilteredTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);';
content = content.replace(target1704, replacement1704);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched other budgetUtilized!");
