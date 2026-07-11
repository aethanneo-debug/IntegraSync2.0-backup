const fs = require('fs');

// 1. Update server.ts
let serverContent = fs.readFileSync('server.ts', 'utf8');
const serverTarget = `  // Deduct the budget
  const budget = db.budgetAllocations.find((b: any) => b.id === budgetId);
  if (budget) {
    budget.budgetUtilized += Number(amount);
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`;
const serverReplacement = `  // Deduct the budget via refund (Released - Spent)
  const budget = db.budgetAllocations.find((b: any) => b.id === budgetId);
  const sub = db.liquidationSubmissions?.find((s: any) => s.submissionNo === liquidationNo);
  let refund = 0;
  if (sub) {
    const released = Number(sub.totalReleased || 0);
    const spent = Number(sub.totalSpent || 0);
    refund = released - spent;
  } else {
    // Fallback if no submission found, subtract 0
    refund = 0;
  }
  
  if (budget) {
    budget.budgetUtilized -= refund;
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`;
serverContent = serverContent.replace(serverTarget, serverReplacement);
fs.writeFileSync('server.ts', serverContent);

// 2. Update FinanceView.tsx
let clientContent = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');
const clientTarget = `                              if (res.status === "success") {
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
const clientReplacement = `                              if (res.status === "success") {
                                setBudgetLinks([res.data, ...budgetLinks]);
                                setBudgets(budgets.map(b => {
                                  if (b.id === bud.id) {
                                    const released = Number(liq.totalReleased || 0);
                                    const spent = Number(liq.totalSpent || 0);
                                    const refund = released - spent;
                                    const utilized = b.budgetUtilized - refund;
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
