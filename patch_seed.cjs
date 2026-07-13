const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target = `    activityBudgetLinks: [
      { id: "bl-1", liquidationNo: "LIQ-2026-001", employee: "Andres B. Bonifacio", department: "Adjudication Division", amount: 12000.00, budgetId: "b-1", timestamp: "2026-06-14T10:00:00Z" },
      { id: "bl-2", liquidationNo: "LIQ-2026-002", employee: "Apolinario M. Mabini", department: "Legal Division", amount: 25000.00, budgetId: "b-3", timestamp: "2026-06-15T11:30:00Z" }
    ],
    pds: []
  };`;

const replacement = `    activityBudgetLinks: [
      { id: "bl-1", liquidationNo: "LIQ-2026-001", employee: "Andres B. Bonifacio", department: "Adjudication Division", amount: 12000.00, budgetId: "b-1", timestamp: "2026-06-14T10:00:00Z" },
      { id: "bl-2", liquidationNo: "LIQ-2026-002", employee: "Apolinario M. Mabini", department: "Legal Division", amount: 25000.00, budgetId: "b-3", timestamp: "2026-06-15T11:30:00Z" }
    ],
    pds: [],
    fiscalYears: [
      { id: "fy-1", label: "2026", start_date: "2026-01-01", end_date: "2026-12-31", status: "Active", rollover_policy: "Standard" },
      { id: "fy-2", label: "2025", start_date: "2025-01-01", end_date: "2025-12-31", status: "Closed", rollover_policy: "Standard" },
      { id: "fy-3", label: "2024", start_date: "2024-01-01", end_date: "2024-12-31", status: "Closed", rollover_policy: "Standard" },
      { id: "fy-4", label: "2023", start_date: "2023-01-01", end_date: "2023-12-31", status: "Closed", rollover_policy: "Standard" }
    ],
    hsacBudgets: [
      { id: "hb-1", fiscalYearId: "fy-1", approvedBudget: 2500000.00, carryOverBudget: 450000.00, totalUtilized: 655500.00 },
      { id: "hb-2", fiscalYearId: "fy-2", approvedBudget: 2200000.00, carryOverBudget: 350000.00, totalUtilized: 2100000.00 }
    ]
  };`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('server.ts', content);
    console.log("Seed patched");
} else {
    console.log("Targets not found!");
}
