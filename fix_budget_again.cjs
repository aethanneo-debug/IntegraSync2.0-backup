const fs = require('fs');
let serverContent = fs.readFileSync('server.ts', 'utf8');

// 1. Remove deduction from Finance Validation
serverContent = serverContent.replace(
`        const refund = released - spent;
        
        budget.budgetUtilized -= refund;
        budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);`,
`        const refund = released - spent;
        // Budget deduction is now strictly handled by manual "Establish Integration Link" feature per user governance`
);

// 2. Remove deduction from Chief Approval
serverContent = serverContent.replace(
`        const refund = released - spent;
        
        budget.budgetUtilized -= refund;
        budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);`,
`        const refund = released - spent;
        // Budget deduction is now strictly handled by manual "Establish Integration Link" feature per user governance`
);

// 3. Add deduction BACK to Integration Link endpoint
serverContent = serverContent.replace(
`  // Budget deduction is handled during the Finance Validation step instead of here to prevent double-deduction.`,
`  // Deduct refund from utilized budget when Integration Link is established
  if (budget) {
    budget.budgetUtilized -= refund;
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`
);

fs.writeFileSync('server.ts', serverContent);

// Now fix the frontend state update
let clientContent = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const clientTarget = `                                // State update for budget is not needed here as it is handled by the automated validation workflow`;
const clientReplacement = `                                setBudgets(budgets.map(b => {
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
