const fs = require('fs');
let clientContent = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// 1. Remove the double deduction in the client state for mapping
const clientTarget = `                                setBudgets(budgets.map(b => {
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
const clientReplacement = `                                // State update for budget is not needed here as it is handled by the automated validation workflow`;
clientContent = clientContent.replace(clientTarget, clientReplacement);

// 2. Fix the dummy multipliers in Detailed Monitoring Cards
clientContent = clientContent.replace(/const obligations = b\.budgetUtilized \* 0\.92; \/\/ Commitments/g, 'const obligations = b.budgetUtilized;');
clientContent = clientContent.replace(/const disbursements = b\.budgetUtilized \* 0\.81; \/\/ Actual payouts released/g, 'const disbursements = b.budgetUtilized;');

// 3. Fix the dummy multipliers in SAAODB & FAR PREVIEW BOARD
clientContent = clientContent.replace(/const obligations = txObligations > 0 \? txObligations : b\.budgetUtilized \* 0\.92;/g, 'const obligations = b.budgetUtilized;');
clientContent = clientContent.replace(/const disbursements = txDisbursements > 0 \? txDisbursements : b\.budgetUtilized \* 0\.81;/g, 'const disbursements = b.budgetUtilized;');

fs.writeFileSync('src/components/FinanceView.tsx', clientContent);

let serverContent = fs.readFileSync('server.ts', 'utf8');

// Remove double deduction in API route
const serverTarget = `  if (budget) {
    budget.budgetUtilized -= refund;
    budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
    budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
  }`;
const serverReplacement = `  // Budget deduction is handled during the Finance Validation step instead of here to prevent double-deduction.`;
serverContent = serverContent.replace(serverTarget, serverReplacement);

fs.writeFileSync('server.ts', serverContent);
