const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

// 1. Remove window.confirm from handleRestoreUser
content = content.replace(
  '  async function handleRestoreUser(id: string) {\n    if (!window.confirm("Are you sure you want to restore this user account?")) {\n      return;\n    }\n    setError("");',
  '  async function handleRestoreUser(id: string) {\n    setError("");'
);

// 2. Remove window.confirm from any other handlers if any, like handleResetPassword
content = content.replace(
  '    if (!window.confirm(`Are you sure you want to reset the password for ${username}?`)) {\n      return;\n    }',
  ''
);

// 3. Let's make sure the form only has Active and Archived
content = content.replace(
  '<option value="Deactivated">Deactivated</option>',
  ''
);
content = content.replace(
  'const [accountStatus, setAccountStatus] = useState<"Active" | "Deactivated" | "Archived">("Active");',
  'const [accountStatus, setAccountStatus] = useState<"Active" | "Archived">("Active");'
);
content = content.replace(
  'onChange={e => setAccountStatus(e.target.value as "Active" | "Deactivated" | "Archived")}',
  'onChange={e => setAccountStatus(e.target.value as "Active" | "Archived")}'
);

// 4. Update the Deactivate button to say Archive and do Archived directly
content = content.replace(
  'body: JSON.stringify({ status: "Deactivated" })',
  'body: JSON.stringify({ status: "Archived" })'
);
content = content.replace(
  'setSuccess("Account deactivated and archived.");',
  'setSuccess("Account archived successfully.");'
);
content = content.replace(
  '<span>Deactivate</span>',
  '<span>Archive</span>'
);

// We can optionally use window.alert if needed, but let's just use the on-page success message.
// Actually, wait, the on-page success message is ONLY in the modal!
// To show a success message globally, we'd need a global state.
// But for now, fixing the button action is the main issue.

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
