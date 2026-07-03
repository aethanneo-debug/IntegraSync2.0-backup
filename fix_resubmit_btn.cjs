const fs = require('fs');
let content = fs.readFileSync('src/components/EmployeePortalView.tsx', 'utf8');

const targetRow = `                        {r.status === "Rejected" && (`;
const replacementRow = `                        {(r.status === "Rejected" || r.status === "Returned by HR" || r.status === "Returned by Division Chief") && (`;

content = content.replace(targetRow, replacementRow);
fs.writeFileSync('src/components/EmployeePortalView.tsx', content);
