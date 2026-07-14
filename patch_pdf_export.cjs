const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `    budgets: () => {
      const headers = ["Department Module", "Budget Allocation (PHP)", "Utilized Treasury", "Remaining Reserve", "Utilization Percent"];
      const rows = budgets.map(b => [
        b.department,
        b.budgetAllocation.toString(),
        b.budgetUtilized.toString(),
        b.remainingBudget.toString(),
        \`\${b.budgetPercentageUsed}%\`
      ]);`;

const replacement = `    budgets: () => {
      const headers = ["Department Module", "Budget Allocation (PHP)", "Utilized Treasury", "Remaining Reserve", "Utilization Percent"];
      const rows = budgets.map(b => {
        const deptYearTxns = yearFilteredTxns.filter(t => (t.department || "").toLowerCase() === b.department.toLowerCase());
        const obligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
        return [
          b.department,
          (b.budgetAllocation + (b.carryOver || 0)).toString(),
          obligations.toString(),
          (b.budgetAllocation + (b.carryOver || 0) - obligations).toString(),
          \`\${Math.round((obligations / Math.max(1, b.budgetAllocation + (b.carryOver || 0))) * 100)}%\`
        ];
      });`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched PDF export");
