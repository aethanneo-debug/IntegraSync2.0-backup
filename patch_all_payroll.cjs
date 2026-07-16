const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const regex = /const totalPayroll = employees\.filter\(e => \(e\.division \|\| ""\)\.toLowerCase\(\) === b\.department\.toLowerCase\(\)\)\.reduce\(\(sum, e\) => sum \+ \(Number\(e\.salary\) \|\| 0\), 0\);/g;

code = code.replace(regex, 'const totalPayroll = 0; // Employees payroll disabled to allow zero start');
fs.writeFileSync('src/components/FinanceView.tsx', code);
