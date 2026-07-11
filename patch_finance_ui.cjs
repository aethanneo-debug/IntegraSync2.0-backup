const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace(
  'Dossier validated and endorsed successfully!',
  'Dossier validated and finalized successfully!'
);

content = content.replace(
  'Financial documentations validated & endorsed.',
  'Financial documentations validated & finalized.'
);

content = content.replace(
  'Execute final verification before forwarding to Division Chief endorsement.',
  'Execute final validation to generate the Financial Transaction and update the budget.'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
