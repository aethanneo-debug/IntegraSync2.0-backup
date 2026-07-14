const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace(
  /<option value="2024">Fiscal Year 2024<\/option>\s*<option value="2023">Fiscal Year 2023<\/option>/g,
  ''
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched FinanceView.tsx");
