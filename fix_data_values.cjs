const fs = require('fs');

if (fs.existsSync('data_store.json')) {
  let db = JSON.parse(fs.readFileSync('data_store.json', 'utf8'));
  
  const b1 = db.budgetAllocations.find(b => b.id === "b-1");
  if (b1) {
    b1.allocatedPS = 600000; b1.allocatedMOOE = 360000; b1.allocatedCO = 240000;
  }
  const b2 = db.budgetAllocations.find(b => b.id === "b-2");
  if (b2) {
    b2.allocatedPS = 1200000; b2.allocatedMOOE = 720000; b2.allocatedCO = 480000;
  }
  const b3 = db.budgetAllocations.find(b => b.id === "b-3");
  if (b3) {
    b3.allocatedPS = 400000; b3.allocatedMOOE = 240000; b3.allocatedCO = 160000;
  }
  
  if (db.budgetAllocations) {
    db.budgetAllocations.forEach(b => {
      b.remainingPS = (b.allocatedPS || 0) - (b.utilizedPS || 0);
      b.remainingMOOE = (b.allocatedMOOE || 0) - (b.utilizedMOOE || 0);
      b.remainingCO = (b.allocatedCO || 0) - (b.utilizedCO || 0);
    });
  }

  fs.writeFileSync('data_store.json', JSON.stringify(db, null, 2), 'utf8');
}
