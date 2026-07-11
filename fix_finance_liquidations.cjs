const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// Replace the filter logic
content = content.replace(
  /const yearFilteredLiquidations = liquidations\.filter\(l => \(l\.liquidationDate && l\.liquidationDate\.startsWith\(activeFiscalYear\)\) \|\| \(l\.createdAt && l\.createdAt\.startsWith\(activeFiscalYear\)\)\);/,
  'const yearFilteredSubmissions = submissions.filter(s => s.createdAt && s.createdAt.startsWith(activeFiscalYear));'
);

// Replace counts
content = content.replace(
  'const pendingLiqCount = yearFilteredLiquidations.filter(l => l.status !== "Completed").length;',
  'const pendingLiqCount = yearFilteredSubmissions.filter(s => s.status !== "Completed").length;'
);
content = content.replace(
  'const completedLiqCount = yearFilteredLiquidations.filter(l => l.status === "Completed").length;',
  'const completedLiqCount = yearFilteredSubmissions.filter(s => s.status === "Completed").length;'
);
content = content.replace(
  'const totalApprovedLiqAmount = yearFilteredLiquidations.filter(l => l.status === "Completed").reduce((acc, l) => acc + l.amountLiquidated, 0);',
  'const totalApprovedLiqAmount = yearFilteredSubmissions.filter(s => s.status === "Completed").reduce((acc, s) => acc + s.totalSpent, 0);'
);

// Replace export methods
content = content.replace(
  'const rows = yearFilteredLiquidations.map(l => [',
  'const rows = yearFilteredSubmissions.map(l => ['
);
content = content.replace(
  'l.liquidationNo,',
  'l.submissionNo,'
);
content = content.replace(
  'l.requestRef,',
  'l.activityId,'
);
content = content.replace(
  'l.employee,',
  'l.employeeName,'
);
content = content.replace(
  'l.department,',
  '"N/A",'
);
content = content.replace(
  'l.amountReleased.toString(),',
  'l.totalReleased.toString(),'
);
content = content.replace(
  'l.amountLiquidated.toString(),',
  'l.totalSpent.toString(),'
);
content = content.replace(
  'l.remainingBalance.toString(),',
  'l.remainingBalance.toString(),'
);
content = content.replace(
  /l\.liquidationDate \|\| "N\/A"/g,
  'l.createdAt'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
