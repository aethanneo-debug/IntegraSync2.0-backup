const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

content = content.replace(
  '  async function handleResetPassword(id: string, username: string) {\n    if (!window.confirm(`Are you sure you want to reset the password for ${username} to the default temporary password?`)) {\n      return;\n    }\n    setError("");',
  '  async function handleResetPassword(id: string, username: string) {\n    setError("");'
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
