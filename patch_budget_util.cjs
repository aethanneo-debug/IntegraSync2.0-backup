const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target = `  // Deduct refund from utilized budget when Integration Link is established
  if (budget) {
    budget.budgetUtilized -= refund;
    budget.unliquidatedAdvances = (budget.unliquidatedAdvances || 0) + refund;
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized - budget.unliquidatedAdvances;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`;

const replacement = `  // Add actual spent amount to utilized budget when Integration Link is established
  if (budget) {
    const spentAmount = sub ? Number(sub.totalSpent || 0) : Number(amount || 0);
    budget.budgetUtilized += spentAmount;
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized - (budget.unliquidatedAdvances || 0);
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('server.ts', content);
    console.log("Replaced server budget util");
} else {
    console.log("Target not found in server.ts");
}
