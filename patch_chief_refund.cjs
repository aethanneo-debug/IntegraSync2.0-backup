const fs = require('fs');
let serverContent = fs.readFileSync('server.ts', 'utf8');

const chiefTarget = `      if (budget) {
        budget.budgetUtilized += sub.totalSpent;
        budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
      }`;

const chiefReplacement = `      if (budget) {
        const released = Number(sub.totalReleased || 0);
        const spent = Number(sub.totalSpent || 0);
        const refund = released - spent;
        
        budget.budgetUtilized -= refund;
        budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
      }`;

serverContent = serverContent.replace(chiefTarget, chiefReplacement);
fs.writeFileSync('server.ts', serverContent);
