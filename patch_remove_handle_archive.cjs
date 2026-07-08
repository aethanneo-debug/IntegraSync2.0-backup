const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

content = content.replace(
  /  async function handleArchiveUser\(id: string\) \{[\s\S]*?  \}\n\n/,
  ''
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
