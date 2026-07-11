const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// Remove the "Initiate Liquidation Advance" button
content = content.replace(
  /\{isFinanceOrAdmin && \(\s*<button\s*onClick=\{\(\) => setIsLiqModalOpen\(true\)\}[\s\S]*?<\/button>\s*\)\}/,
  ''
);

// Remove the modal itself
content = content.replace(
  /\{\/\* CREATE NEW LIQUIDATION DISCOVERY MODAL \*\/\}\s*\{isLiqModalOpen && \([\s\S]*?<\/form>\s*<\/div>\s*<\/div>\s*\)\}/,
  ''
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
