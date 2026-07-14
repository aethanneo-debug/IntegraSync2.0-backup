const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target1 = `{ id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 0, budgetUtilized: 0, remainingBudget: 1200000.00, budgetPercentageUsed: 0 }`;
const replacement1 = `{ id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 }`;

const target2 = `{ id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 0, budgetUtilized: 0, remainingBudget: 2400000.00, budgetPercentageUsed: 0 }`;
const replacement2 = `{ id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 }`;

const target3 = `{ id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 0, budgetUtilized: 0, remainingBudget: 800000.00, budgetPercentageUsed: 0 }`;
const replacement3 = `{ id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 }`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);
content = content.replace(target3, replacement3);

// wait, I also have to fix loaded.budgetAllocations at the top of server.ts
content = content.replace(
  `{ id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 0, budgetUtilized: 0, remainingBudget: 1200000.00, budgetPercentageUsed: 0 },`,
  `{ id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 },`
);
content = content.replace(
  `{ id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 0, budgetUtilized: 0, remainingBudget: 2400000.00, budgetPercentageUsed: 0 },`,
  `{ id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 },`
);
content = content.replace(
  `{ id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 0, budgetUtilized: 0, remainingBudget: 800000.00, budgetPercentageUsed: 0 }`,
  `{ id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 }`
);

fs.writeFileSync('server.ts', content);
console.log("Patched!");
