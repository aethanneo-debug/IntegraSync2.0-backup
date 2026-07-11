const fs = require('fs');
let serverContent = fs.readFileSync('server.ts', 'utf8');

const validateTarget = `      if (budget) {
        budget.budgetUtilized += sub.totalSpent;
        budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
        
        // Auto-link to activityBudgetLinks
        if (!db.activityBudgetLinks) db.activityBudgetLinks = [];
        db.activityBudgetLinks.unshift({
          id: \`bl-\${Date.now()}\`,
          liquidationNo: sub.submissionNo,
          employee: sub.employeeName,
          department: budget.department,
          amount: sub.totalSpent,
          budgetId: budget.id,
          timestamp: new Date().toISOString()
        });
      }`;

const validateReplacement = `      if (budget) {
        const released = Number(sub.totalReleased || 0);
        const spent = Number(sub.totalSpent || 0);
        const refund = released - spent;
        
        budget.budgetUtilized -= refund;
        budget.remainingBudget = budget.budgetAllocation - budget.budgetUtilized;
        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
        
        // Auto-link to activityBudgetLinks
        if (!db.activityBudgetLinks) db.activityBudgetLinks = [];
        db.activityBudgetLinks.unshift({
          id: \`bl-\${Date.now()}\`,
          liquidationNo: sub.submissionNo,
          employee: sub.employeeName,
          department: budget.department,
          amount: spent,
          budgetId: budget.id,
          timestamp: new Date().toISOString()
        });
      }`;

serverContent = serverContent.replace(validateTarget, validateReplacement);

// There is also a second copy of this code down below in server.ts? 
// Let's replace globally just in case.
serverContent = serverContent.replace(validateTarget, validateReplacement);

fs.writeFileSync('server.ts', serverContent);
