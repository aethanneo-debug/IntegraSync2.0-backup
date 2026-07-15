const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '          <FinanceView \n            user={user} \n            transactions={transactions} \n            fetchSummary={fetchSummary}',
  '          <FinanceView \n            user={user} \n            transactions={transactions} \n            employees={employees}\n            fetchSummary={fetchSummary}'
);

code = code.replace(
  '          <FinanceView \n            user={user} \n            transactions={transactions} \n            fetchSummary={fetchSummary}',
  '          <FinanceView \n            user={user} \n            transactions={transactions} \n            employees={employees}\n            fetchSummary={fetchSummary}'
);

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx patched");
