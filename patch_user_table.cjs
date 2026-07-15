const fs = require('fs');
let code = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

code = code.replace(
  '{usr.plantillaNumber || "None Assigned"}',
  '{usr.employeeId || usr.plantillaNumber || "None Assigned"}'
);

code = code.replace(
  '<th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase font-mono">Plantilla Number</th>',
  '<th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase font-mono">Employee ID</th>'
);

fs.writeFileSync('src/components/UserAccountsView.tsx', code);
console.log("UserAccountsView table patched");
