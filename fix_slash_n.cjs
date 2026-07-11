const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace('\\\\n  // Load backend arrays on mount and updates', '\\n  // Load backend arrays on mount and updates');

fs.writeFileSync('src/components/FinanceView.tsx', content);
