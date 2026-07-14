const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// 1. Initial seed data for budget allocations
content = content.replace(
  '{ id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 },',
  '{ id: "b-1", fiscalYearId: "fy-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 },\n          { id: "b-1-old", fiscalYearId: "fy-2", department: "Adjudication Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 1500000.00, remainingBudget: 1000000.00, budgetPercentageUsed: 0 },'
);
content = content.replace(
  '{ id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 },',
  '{ id: "b-2", fiscalYearId: "fy-1", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 },\n          { id: "b-2-old", fiscalYearId: "fy-2", department: "Administrative and Finance Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 700000.00, remainingBudget: 300000.00, budgetPercentageUsed: 0 },'
);
content = content.replace(
  '{ id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 }',
  '{ id: "b-3", fiscalYearId: "fy-1", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 },\n          { id: "b-3-old", fiscalYearId: "fy-2", department: "Legal Division", budgetAllocation: 1800000.00, carryOver: 0, budgetUtilized: 1600000.00, remainingBudget: 200000.00, budgetPercentageUsed: 0 }'
);

// Do it again for the second occurrence (if there is one in initial seed)
content = content.replace(
  '{ id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 },',
  '{ id: "b-1", fiscalYearId: "fy-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 },\n      { id: "b-1-old", fiscalYearId: "fy-2", department: "Adjudication Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 1500000.00, remainingBudget: 1000000.00, budgetPercentageUsed: 0 },'
);
content = content.replace(
  '{ id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 },',
  '{ id: "b-2", fiscalYearId: "fy-1", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 },\n      { id: "b-2-old", fiscalYearId: "fy-2", department: "Administrative and Finance Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 700000.00, remainingBudget: 300000.00, budgetPercentageUsed: 0 },'
);
content = content.replace(
  '{ id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 }',
  '{ id: "b-3", fiscalYearId: "fy-1", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 },\n      { id: "b-3-old", fiscalYearId: "fy-2", department: "Legal Division", budgetAllocation: 1800000.00, carryOver: 0, budgetUtilized: 1600000.00, remainingBudget: 200000.00, budgetPercentageUsed: 0 }'
);

// 2. Rollover logic
const rolloverTarget = `      // Calculate division budgets based on actual spending and carryovers
      // "The amount of money on what per division will get is based on how much they have spent last year"
      // "carryovers (left money from previous year) will be added to the next fiscal year budget BUT IT WILL STAY be added to that specific division only"
      db.budgetAllocations = (db.budgetAllocations || []).map((b: any) => {
        const spentLastYear = b.budgetUtilized || 0;
        // Remaining budget includes previous allocations and carryovers minus utilization
        const leftover = Math.max(0, (b.budgetAllocation || 0) + (b.carryOver || 0) - (b.budgetUtilized || 0));
        
        totalApproved += spentLastYear;
        carryOver += leftover;
        
        return {
          ...b,
          budgetAllocation: spentLastYear, // Next year's allocation based on last year's spending
          carryOver: leftover, // Stays with this specific division
          budgetUtilized: 0,
          remainingBudget: spentLastYear + leftover,
          budgetPercentageUsed: 0
        };
      });`;

const rolloverReplacement = `      // Calculate division budgets based on actual spending and carryovers
      const oldAllocations = (db.budgetAllocations || []).filter((b: any) => b.fiscalYearId === activeFy.id);
      const newAllocations = oldAllocations.map((b: any) => {
        const spentLastYear = b.budgetUtilized || 0;
        const leftover = Math.max(0, (b.budgetAllocation || 0) + (b.carryOver || 0) - (b.budgetUtilized || 0));
        
        totalApproved += spentLastYear;
        carryOver += leftover;
        
        return {
          ...b,
          id: \`b-\${Date.now()}-\${Math.floor(Math.random() * 1000)}\`,
          fiscalYearId: newFy.id,
          budgetAllocation: spentLastYear,
          carryOver: leftover,
          budgetUtilized: 0,
          remainingBudget: spentLastYear + leftover,
          budgetPercentageUsed: 0
        };
      });
      db.budgetAllocations = [...(db.budgetAllocations || []), ...newAllocations];`;

content = content.replace(rolloverTarget, rolloverReplacement);

fs.writeFileSync('server.ts', content);
console.log("Patched server!");
