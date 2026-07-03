const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

content = content.replace(
  'const [accountStatus, setAccountStatus] = useState<"Active" | "Deactivated">("Active");',
  'const [accountStatus, setAccountStatus] = useState<"Active" | "Deactivated" | "Archived">("Active");'
);

content = content.replace(
  'onChange={e => setAccountStatus(e.target.value as "Active" | "Deactivated")}',
  'onChange={e => setAccountStatus(e.target.value as "Active" | "Deactivated" | "Archived")}'
);

content = content.replace(
  '<option value="Deactivated">Deactivated</option>',
  '<option value="Deactivated">Deactivated</option>\n                  <option value="Archived">Archived</option>'
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
