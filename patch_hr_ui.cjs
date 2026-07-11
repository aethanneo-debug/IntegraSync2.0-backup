const fs = require('fs');
let content = fs.readFileSync('src/components/HrUnifiedRequests.tsx', 'utf8');

// The single view item action
content = content.replace(
  'Endorse (Chief/Finance)',
  '{viewItem?._category === "Liquidation" ? "Endorse to Finance" : "Endorse to Chief"}'
);

content = content.replace(
  'Endorse (Chief/Finance)',
  'Endorse (Chief/Finance)'
);

fs.writeFileSync('src/components/HrUnifiedRequests.tsx', content);
