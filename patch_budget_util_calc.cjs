const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                  const util = hb ? (hb.totalUtilized || 0) : 0;`;

const replacement = `                  const util = budgets.reduce((acc, b) => acc + (b.budgetUtilized || 0), 0);`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Calculated totalUtilized");
} else {
    console.log("Target not found!");
}
