const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                                      remainingBudget: b.budgetAllocation - utilized - unliquidated,
                                      budgetPercentageUsed: Math.round((utilized / b.budgetAllocation) * 100)`;

const replacement = `                                      remainingBudget: b.budgetAllocation + (b.carryOver || 0) - utilized - unliquidated,
                                      budgetPercentageUsed: Math.round((utilized / (b.budgetAllocation + (b.carryOver || 0))) * 100)`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Successfully patched FinanceView calculations");
