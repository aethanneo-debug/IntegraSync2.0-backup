const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const regex = /const txObligations = deptYearTxns\.filter\(t => t\.status === "Validated" \|\| t\.status === "Liquidated"\)\.reduce\(\(sum, t\) => sum \+ t\.amount, 0\);\s*const totalPayroll = employees\.filter\(e => \(e\.division \|\| ""\)\.toLowerCase\(\) === div\.toLowerCase\(\)\)\.reduce\(\(sum, e\) => sum \+ \(Number\(e\.salary\) \|\| 0\), 0\);\s*const obligations = txObligations \+ totalPayroll;/;

const replacement = `const txObligations = deptYearTxns.filter(t => t.status === "Validated" || t.status === "Liquidated").reduce((sum, t) => sum + t.amount, 0);
                          const totalPayroll = 0; // Removing automatic payroll addition to let the user start at exactly 0. You can re-enable this or log payroll as transactions.
                          const obligations = txObligations + totalPayroll;`;

if (code.match(regex)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/FinanceView.tsx', code);
  console.log("Patched successfully");
} else {
  console.log("Regex not found");
}
