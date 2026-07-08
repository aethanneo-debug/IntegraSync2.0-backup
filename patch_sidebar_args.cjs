const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

content = content.replace(
  '  onLogout,\n  activeFinanceSubTab',
  '  onLogout,\n  onChangePassword,\n  activeFinanceSubTab'
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
