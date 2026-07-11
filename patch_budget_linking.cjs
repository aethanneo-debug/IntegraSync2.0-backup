const fs = require('fs');

// 1. Update server.ts
let serverContent = fs.readFileSync('server.ts', 'utf8');
const serverTarget = `  if (!db.activityBudgetLinks) db.activityBudgetLinks = [];
  db.activityBudgetLinks.unshift(newLink);`;
const serverReplacement = `  if (!db.activityBudgetLinks) db.activityBudgetLinks = [];
  db.activityBudgetLinks.unshift(newLink);
  
  // Deduct the budget
  const budget = db.budgetAllocations.find((b: any) => b.id === budgetId);
  if (budget) {
    budget.budgetUtilized += Number(amount);
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`;
serverContent = serverContent.replace(serverTarget, serverReplacement);
fs.writeFileSync('server.ts', serverContent);

// 2. Update FinanceView.tsx
let clientContent = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');
clientContent = clientContent.replace(
  'const amountVal = liq.totalReleased || liq.totalSpent || 0;',
  'const amountVal = liq.totalSpent || 0;'
);

const clientTarget = `                              if (res.status === "success") {
                                setBudgetLinks([res.data, ...budgetLinks]);`;
const clientReplacement = `                              if (res.status === "success") {
                                setBudgetLinks([res.data, ...budgetLinks]);
                                setBudgets(budgets.map(b => {
                                  if (b.id === bud.id) {
                                    const utilized = b.budgetUtilized + amountVal;
                                    return {
                                      ...b,
                                      budgetUtilized: utilized,
                                      remainingBudget: b.budgetAllocation - utilized,
                                      budgetPercentageUsed: Math.round((utilized / b.budgetAllocation) * 100)
                                    };
                                  }
                                  return b;
                                }));`;
clientContent = clientContent.replace(clientTarget, clientReplacement);
fs.writeFileSync('src/components/FinanceView.tsx', clientContent);
