const fs = require('fs');
const dbPath = './data_store.json';
const dbStr = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbStr);

console.log("Txns:", db.financialTransactions ? db.financialTransactions.length : 0);
console.log("Fiscal Years:", db.fiscalYears ? db.fiscalYears.length : 0);
console.log("HSAC Budgets:", db.hsacBudgets ? db.hsacBudgets.length : 0);
console.log("Budgets:", db.budgets ? db.budgets.length : 0);
console.log("Requests:", db.requests ? db.requests.length : 0);

// We need to figure out what relates to 2026.
// In the app, maybe financialTransactions have a fiscalYear property or date.
// Let's print out some sample data to know how to filter.
const txns2026 = db.financialTransactions ? db.financialTransactions.filter(t => t.fiscalYear === '2026' || (t.date && t.date.startsWith('2026'))) : [];
console.log("2026 Txns found:", txns2026.length);

const fy2026 = db.fiscalYears ? db.fiscalYears.find(fy => fy.label === '2026') : null;
console.log("FY 2026:", fy2026);

