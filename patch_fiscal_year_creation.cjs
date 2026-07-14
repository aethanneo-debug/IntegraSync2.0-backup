const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target1 = `  // Close other fiscal years and calculate carryover
  let carryOver = 0;
  const activeFy = db.fiscalYears.find((f: any) => f.status === "Active");
  if (activeFy) {
    activeFy.status = "Closed";
    const activeHb = db.hsacBudgets.find((hb: any) => hb.fiscalYearId === activeFy.id);
    if (activeHb) {
      carryOver = activeHb.approvedBudget + (activeHb.carryOverBudget || 0) - (activeHb.totalUtilized || 0);
      if (carryOver < 0) carryOver = 0; // Prevent negative carryover
    }
  }

  db.fiscalYears.unshift(newFy);

  const newHb = {
    id: \`hb-\${Date.now()}\`,
    fiscalYearId: newFy.id,
    approvedBudget: 0,
    carryOverBudget: carryOver,
    totalUtilized: 0
  };
  db.hsacBudgets.unshift(newHb);`;

const replacement1 = `  // Close other fiscal years and calculate carryover
  let carryOver = 0;
  let totalApproved = 0;
  const activeFy = db.fiscalYears.find((f: any) => f.status === "Active");
  if (activeFy) {
    activeFy.status = "Closed";
    const activeHb = db.hsacBudgets.find((hb: any) => hb.fiscalYearId === activeFy.id);
    if (activeHb) {
      // Calculate division budgets based on actual spending and carryovers
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
      });
    }
  }

  db.fiscalYears.unshift(newFy);

  const newHb = {
    id: \`hb-\${Date.now()}\`,
    fiscalYearId: newFy.id,
    // If it's a new year and we calculated from previous, the total approved is the sum of all division's spent last year.
    // If there is no previous year, we set to 0.
    approvedBudget: totalApproved,
    carryOverBudget: carryOver,
    totalUtilized: 0
  };
  db.hsacBudgets.unshift(newHb);`;

if(content.includes(target1)) {
  content = content.replace(target1, replacement1);
  fs.writeFileSync('server.ts', content);
  console.log("Successfully patched /api/fiscal-years in server.ts");
} else {
  console.log("Target not found in server.ts");
}
