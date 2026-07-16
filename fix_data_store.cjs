const fs = require('fs');

if (fs.existsSync('data_store.json')) {
  let db = JSON.parse(fs.readFileSync('data_store.json', 'utf8'));
  if (db.budgetAllocations) {
    db.budgetAllocations.forEach(b => {
      if (b.allocatedPS === undefined || isNaN(b.allocatedPS)) b.allocatedPS = 0;
      if (b.allocatedMOOE === undefined || isNaN(b.allocatedMOOE)) b.allocatedMOOE = 0;
      if (b.allocatedCO === undefined || isNaN(b.allocatedCO)) b.allocatedCO = 0;
      b.remainingPS = (b.allocatedPS || 0) - (b.utilizedPS || 0);
      b.remainingMOOE = (b.allocatedMOOE || 0) - (b.utilizedMOOE || 0);
      b.remainingCO = (b.allocatedCO || 0) - (b.utilizedCO || 0);
    });
  }
  
  if (db.hsacBudgets) {
    const activeHb = db.hsacBudgets.find(hb => hb.fiscalYearId === "fy-1");
    if (activeHb && activeHb.approvedBudget < 10000000) {
      activeHb.approvedBudget = 10000000;
    }
  }

  fs.writeFileSync('data_store.json', JSON.stringify(db, null, 2), 'utf8');
}
