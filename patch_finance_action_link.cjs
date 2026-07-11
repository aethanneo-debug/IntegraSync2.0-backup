const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const targetStr = `        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
      }`;
const replacementStr = `        budget.budgetPercentageUsed = Math.round((budget.budgetUtilized / budget.budgetAllocation) * 100);
        
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

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('server.ts', content);
