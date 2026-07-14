const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Patch fiscal years
content = content.replace(
  /if \(\!loaded\.fiscalYears\) \{[\s\S]*?changed = true;\n      \}/g,
  `if (!loaded.fiscalYears) {
        loaded.fiscalYears = [
          { id: "fy-1", label: "2026", start_date: "2026-01-01", end_date: "2026-12-31", status: "Active", rollover_policy: "Standard" },
          { id: "fy-2", label: "2025", start_date: "2025-01-01", end_date: "2025-12-31", status: "Closed", rollover_policy: "Standard" }
        ];
        changed = true;
      }`
);

// Patch hsacBudgets
content = content.replace(
  /if \(\!loaded\.hsacBudgets\) \{[\s\S]*?changed = true;\n      \}/g,
  `if (!loaded.hsacBudgets) {
        loaded.hsacBudgets = [
          { id: "hb-1", fiscalYearId: "fy-1", approvedBudget: 4400000.00, carryOverBudget: 600000.00, totalUtilized: 0 },
          { id: "hb-2", fiscalYearId: "fy-2", approvedBudget: 5000000.00, carryOverBudget: 0, totalUtilized: 4400000.00 }
        ];
        changed = true;
      }`
);

// Patch budgetAllocations inside loaded check
content = content.replace(
  /if \(\!loaded\.budgetAllocations\) \{[\s\S]*?changed = true;\n      \}/g,
  `if (!loaded.budgetAllocations) {
        loaded.budgetAllocations = [
          { id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 },
          { id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 },
          { id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 }
        ];
        changed = true;
      }`
);

// Patch seedDB fiscal years
content = content.replace(
  /fiscalYears: \[[\s\S]*?\],\n    hsacBudgets: \[[\s\S]*?\]/,
  `fiscalYears: [
      { id: "fy-1", label: "2026", start_date: "2026-01-01", end_date: "2026-12-31", status: "Active", rollover_policy: "Standard" },
      { id: "fy-2", label: "2025", start_date: "2025-01-01", end_date: "2025-12-31", status: "Closed", rollover_policy: "Standard" }
    ],
    hsacBudgets: [
      { id: "hb-1", fiscalYearId: "fy-1", approvedBudget: 4400000.00, carryOverBudget: 600000.00, totalUtilized: 0 },
      { id: "hb-2", fiscalYearId: "fy-2", approvedBudget: 5000000.00, carryOverBudget: 0, totalUtilized: 4400000.00 }
    ]`
);

// Patch seedDB budgetAllocations
content = content.replace(
  /budgetAllocations: \[[\s\S]*?\],\n    financeAuditLogs:/g,
  `budgetAllocations: [
      { id: "b-1", department: "Adjudication Division", budgetAllocation: 1200000.00, carryOver: 300000.00, budgetUtilized: 0, remainingBudget: 1500000.00, budgetPercentageUsed: 0 },
      { id: "b-2", department: "Administrative and Finance Division", budgetAllocation: 2400000.00, carryOver: 100000.00, budgetUtilized: 0, remainingBudget: 2500000.00, budgetPercentageUsed: 0 },
      { id: "b-3", department: "Legal Division", budgetAllocation: 800000.00, carryOver: 200000.00, budgetUtilized: 0, remainingBudget: 1000000.00, budgetPercentageUsed: 0 }
    ],
    financeAuditLogs:`
);

fs.writeFileSync('server.ts', content);
console.log("Successfully patched seed data in server.ts");
