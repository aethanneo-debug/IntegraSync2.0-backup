const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  '{ id: "b-1-old", fiscalYearId: "fy-2", department: "Adjudication Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 1500000.00, remainingBudget: 1000000.00, budgetPercentageUsed: 0 },',
  '{ id: "b-1-old", fiscalYearId: "fy-2", department: "Adjudication Division", budgetAllocation: 2400000.00, carryOver: 0, budgetUtilized: 1500000.00, remainingBudget: 900000.00, budgetPercentageUsed: 0 },'
);
content = content.replace(
  '{ id: "b-2-old", fiscalYearId: "fy-2", department: "Administrative and Finance Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 700000.00, remainingBudget: 300000.00, budgetPercentageUsed: 0 },',
  '{ id: "b-2-old", fiscalYearId: "fy-2", department: "Administrative and Finance Division", budgetAllocation: 800000.00, carryOver: 0, budgetUtilized: 700000.00, remainingBudget: 100000.00, budgetPercentageUsed: 0 },'
);
content = content.replace(
  '{ id: "b-3-old", fiscalYearId: "fy-2", department: "Legal Division", budgetAllocation: 1800000.00, carryOver: 0, budgetUtilized: 1600000.00, remainingBudget: 200000.00, budgetPercentageUsed: 0 }',
  '{ id: "b-3-old", fiscalYearId: "fy-2", department: "Legal Division", budgetAllocation: 1800000.00, carryOver: 0, budgetUtilized: 1600000.00, remainingBudget: 200000.00, budgetPercentageUsed: 0 }'
);

content = content.replace(
  '{ id: "hb-2", fiscalYearId: "fy-2", approvedBudget: 5000000.00, carryOverBudget: 0, totalUtilized: 4400000.00 }',
  '{ id: "hb-2", fiscalYearId: "fy-2", approvedBudget: 5000000.00, carryOverBudget: 0, totalUtilized: 3800000.00 }'
);

fs.writeFileSync('server.ts', content);
console.log("Patched 2025!");
