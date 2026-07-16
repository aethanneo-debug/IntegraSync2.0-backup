const fs = require('fs');
const dbPath = './data_store.json';
const dbStr = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbStr);

// Find FY 2026
const fy2026 = db.fiscalYears ? db.fiscalYears.find(fy => fy.label === '2026') : null;
if (fy2026) {
  // Remove 2026 transactions
  if (db.financialTransactions) {
    db.financialTransactions = db.financialTransactions.filter(t => {
      // Keep if transactionDate is not 2026
      if (t.transactionDate && t.transactionDate.startsWith('2026')) return false;
      return true;
    });
  }

  // Reset budgetAllocations for 2026
  if (db.budgetAllocations) {
    db.budgetAllocations.forEach(b => {
      if (b.fiscalYearId === fy2026.id) {
        b.budgetAllocation = 0;
        b.allocatedPS = 0;
        b.allocatedMOOE = 0;
        b.allocatedCO = 0;
        b.budgetUtilized = 0;
      }
    });
  }
  
  // Also reset HSAC Budgets for 2026
  if (db.hsacBudgets) {
    db.hsacBudgets.forEach(hb => {
      if (hb.fiscalYearId === fy2026.id) {
        hb.approvedBudget = 0;
        hb.totalUtilized = 0;
      }
    });
  }

  // Reset requests for 2026
  if (db.requests) {
    db.requests = db.requests.filter(req => {
       if (req.date && req.date.startsWith('2026')) return false;
       if (req.createdAt && req.createdAt.startsWith('2026')) return false;
       return true;
    });
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Successfully reset 2026 data");
} else {
  console.log("FY 2026 not found");
}

