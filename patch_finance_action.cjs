const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target = `        // Auto-link to activityBudgetLinks
        if (!db.activityBudgetLinks) db.activityBudgetLinks = [];
        db.activityBudgetLinks.unshift({
          id: \`bl-\${Date.now()}\`,
          liquidationNo: sub.submissionNo,
          employee: sub.employeeName,
          department: budget.department,
          amount: spent,
          budgetId: budget.id,
          timestamp: new Date().toISOString()
        });`;

const replacement = `        // Budget deduction and linking is now strictly handled manually in "Establish Integration Link" frontend`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('server.ts', content);
    console.log("Replaced finance action successfully.");
} else {
    console.log("Target not found!");
}
