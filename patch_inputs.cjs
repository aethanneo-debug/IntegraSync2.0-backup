const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

code = code.replace(
  /defaultValue=\{ps\}/g,
  'key={`ps-${id}-${ps}`} defaultValue={ps}'
);
code = code.replace(
  /defaultValue=\{mooe\}/g,
  'key={`mooe-${id}-${mooe}`} defaultValue={mooe}'
);
code = code.replace(
  /defaultValue=\{co\}/g,
  'key={`co-${id}-${co}`} defaultValue={co}'
);

fs.writeFileSync('src/components/FinanceView.tsx', code);
console.log('patched inputs');
