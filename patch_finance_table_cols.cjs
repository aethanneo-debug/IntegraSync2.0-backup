const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// Remove the actions column header
content = content.replace(
  '{isFinanceOrAdmin && <th className="p-4 text-center">Actions</th>}',
  ''
);

// Remove the Triage Loop button cell
content = content.replace(
  /\{isFinanceOrAdmin && \(\s*<td className="p-4 text-center">[\s\S]*?<\/td>\s*\)\}/,
  ''
);

// Adjust colSpan in the empty state
content = content.replace(
  '<td colSpan={9} className="text-center py-12 text-slate-400 font-mono italic">No liquidation advances currently monitored.</td>',
  '<td colSpan={8} className="text-center py-12 text-slate-400 font-mono italic">No liquidation advances currently monitored.</td>'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
