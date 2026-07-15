const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const targetStr1 = 'const obligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);';

// There are 3 occurrences of targetStr1
code = code.split(targetStr1).join(
  'const txObligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);\n' +
  '                    const totalPayroll = employees.filter(e => (e.division || "").toLowerCase() === b.department.toLowerCase()).reduce((sum, e) => sum + (Number(e.salary) || 0), 0);\n' +
  '                    const obligations = txObligations + totalPayroll;'
);

// We also need to fix line 2521 and 2597.
code = code.replace(
  '                       const obligations = txObligations;',
  '                       const totalPayroll = employees.filter(e => (e.division || "").toLowerCase() === b.department.toLowerCase()).reduce((sum, e) => sum + (Number(e.salary) || 0), 0);\n                       const obligations = txObligations + totalPayroll;'
);

code = code.replace(
  '                                 const obligations = txObligations;',
  '                                 const totalPayroll = employees.filter(e => (e.division || "").toLowerCase() === b.department.toLowerCase()).reduce((sum, e) => sum + (Number(e.salary) || 0), 0);\n                                 const obligations = txObligations + totalPayroll;'
);

fs.writeFileSync('src/components/FinanceView.tsx', code);
console.log("FinanceView obligations patched");
