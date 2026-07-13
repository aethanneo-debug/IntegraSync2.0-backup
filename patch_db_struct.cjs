const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const target1 = `  pds: PDS[];
}`;

const replacement1 = `  pds: PDS[];
  fiscalYears: any[];
  hsacBudgets: any[];
}`;

const target2 = `      if (!loaded.activityBudgetLinks) {
        loaded.activityBudgetLinks = [
          { id: "bl-1", liquidationNo: "LIQ-2026-001", employee: "Andres B. Bonifacio", department: "Adjudication Division", amount: 12000.00, budgetId: "b-1", timestamp: "2026-06-14T10:00:00Z" },
          { id: "bl-2", liquidationNo: "LIQ-2026-002", employee: "Apolinario M. Mabini", department: "Legal Division", amount: 25000.00, budgetId: "b-3", timestamp: "2026-06-15T11:30:00Z" }
        ];
        changed = true;
      }`;

const replacement2 = `      if (!loaded.activityBudgetLinks) {
        loaded.activityBudgetLinks = [
          { id: "bl-1", liquidationNo: "LIQ-2026-001", employee: "Andres B. Bonifacio", department: "Adjudication Division", amount: 12000.00, budgetId: "b-1", timestamp: "2026-06-14T10:00:00Z" },
          { id: "bl-2", liquidationNo: "LIQ-2026-002", employee: "Apolinario M. Mabini", department: "Legal Division", amount: 25000.00, budgetId: "b-3", timestamp: "2026-06-15T11:30:00Z" }
        ];
        changed = true;
      }
      if (!loaded.fiscalYears) {
        loaded.fiscalYears = [
          { id: "fy-1", label: "2026", start_date: "2026-01-01", end_date: "2026-12-31", status: "Active", rollover_policy: "Standard" },
          { id: "fy-2", label: "2025", start_date: "2025-01-01", end_date: "2025-12-31", status: "Closed", rollover_policy: "Standard" },
          { id: "fy-3", label: "2024", start_date: "2024-01-01", end_date: "2024-12-31", status: "Closed", rollover_policy: "Standard" },
          { id: "fy-4", label: "2023", start_date: "2023-01-01", end_date: "2023-12-31", status: "Closed", rollover_policy: "Standard" }
        ];
        changed = true;
      }
      if (!loaded.hsacBudgets) {
        loaded.hsacBudgets = [
          { id: "hb-1", fiscalYearId: "fy-1", approvedBudget: 2500000.00, carryOverBudget: 450000.00, totalUtilized: 655500.00 },
          { id: "hb-2", fiscalYearId: "fy-2", approvedBudget: 2200000.00, carryOverBudget: 350000.00, totalUtilized: 2100000.00 }
        ];
        changed = true;
      }`;

if (content.includes(target1) && content.includes(target2)) {
    content = content.replace(target1, replacement1);
    content = content.replace(target2, replacement2);
    fs.writeFileSync('server.ts', content);
    console.log("DB Structure patched");
} else {
    console.log("Targets not found!");
}
