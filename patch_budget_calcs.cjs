const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Replace all instances of remainingBudget and budgetPercentageUsed to include carryOver
content = content.replace(/budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized - \(budget.unliquidatedAdvances \|\| 0\);/g, 
  "budget.remainingBudget = budget.budgetAllocation + (budget.carryOver || 0) - budget.budgetUtilized - (budget.unliquidatedAdvances || 0);");

content = content.replace(/budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;/g, 
  "budget.remainingBudget = budget.budgetAllocation + (budget.carryOver || 0) - budget.budgetUtilized;");

content = content.replace(/budget.budgetPercentageUsed = Math.round\(\(budget.budgetUtilized \/ budget.budgetAllocation\) \* 100\);/g, 
  "budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / (budget.budgetAllocation + (budget.carryOver || 0))) * 100);");

fs.writeFileSync('server.ts', content);
console.log("Successfully patched budget calculations in server.ts");
