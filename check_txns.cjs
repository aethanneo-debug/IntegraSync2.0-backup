const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./data_store.json', 'utf8'));

console.log(JSON.stringify(db.financialTransactions, null, 2));
console.log(JSON.stringify(db.fiscalYears, null, 2));
console.log(JSON.stringify(db.hsacBudgets, null, 2));
console.log(JSON.stringify(db.budgets, null, 2));
