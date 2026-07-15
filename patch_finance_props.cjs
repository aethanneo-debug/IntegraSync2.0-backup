const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

code = code.replace(
  '  transactions: FinancialTransaction[];\n  fetchSummary: () => void;',
  '  transactions: FinancialTransaction[];\n  employees?: any[];\n  fetchSummary: () => void;'
);

code = code.replace(
  'export default function FinanceView({ \n  user, \n  transactions, \n  fetchSummary, \n  onRefresh,',
  'export default function FinanceView({ \n  user, \n  transactions, \n  employees = [],\n  fetchSummary, \n  onRefresh,'
);

fs.writeFileSync('src/components/FinanceView.tsx', code);
console.log("FinanceViewProps patched");
