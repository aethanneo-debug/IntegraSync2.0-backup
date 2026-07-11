const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace(
  /alert\("Initializing browser printing dialogue\.\.\. Document exported to spool\."\);\n\s*window\.print\(\);/g,
  'window.print();'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
