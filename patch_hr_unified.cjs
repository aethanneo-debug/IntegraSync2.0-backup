const fs = require('fs');
let content = fs.readFileSync('src/components/HrUnifiedRequests.tsx', 'utf8');

// Fix the API endpoint
content = content.replace(
  /\/api\/liquidation-submissions\/\$\{item\.id\}\/hr-verify/g,
  '/api/liquidation-submissions/${item.id}/hr-action'
);

content = content.replace(
  /\/api\/liquidation-submissions\/\$\{viewItem\.id\}\/hr-verify/g,
  '/api/liquidation-submissions/${viewItem.id}/hr-action'
);

// We need to change the UI text dynamically for the selected item or bulk.
// Let's replace 'Endorse to Chief' with a dynamic string or just 'Endorse to Finance' if it's liquidation
// In Bulk, maybe we can just say 'Endorse' or 'Verify & Endorse' instead of specifically 'to Chief'.
content = content.replace(
  /<Check size=\{12\} className="mr-1" \/> Endorse to Chief/g,
  '<Check size={12} className="mr-1" /> Endorse (Chief/Finance)'
);

content = content.replace(
  /Endorse to Chief/g,
  'Endorse (Chief/Finance)'
);

fs.writeFileSync('src/components/HrUnifiedRequests.tsx', content);
