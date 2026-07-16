const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  '{ id: "hb-1", fiscalYearId: "fy-1", approvedBudget: 4400000.00',
  '{ id: "hb-1", fiscalYearId: "fy-1", approvedBudget: 10000000.00'
);

fs.writeFileSync('server.ts', code);
