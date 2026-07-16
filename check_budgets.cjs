const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./data_store.json', 'utf8'));

console.log(JSON.stringify(db.budgetAllocations, null, 2));
