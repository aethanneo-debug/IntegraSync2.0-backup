const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// Replace table map
content = content.replace(
  '{yearFilteredLiquidations.map((liq) => (',
  '{yearFilteredSubmissions.map((liq) => ('
);

content = content.replace(
  '{yearFilteredLiquidations.length === 0 && (',
  '{yearFilteredSubmissions.length === 0 && ('
);

content = content.replace(
  '<td className="p-4 font-mono font-black text-slate-700">{liq.liquidationNo}</td>',
  '<td className="p-4 font-mono font-black text-slate-700">{liq.submissionNo}</td>'
);

content = content.replace(
  '<td className="p-4 font-mono text-slate-400">{liq.requestRef}</td>',
  '<td className="p-4 font-mono text-slate-400">{liq.activityId}</td>'
);

content = content.replace(
  '<td className="p-4 font-bold text-slate-850">{liq.employee}</td>',
  '<td className="p-4 font-bold text-slate-850">{liq.employeeName}</td>'
);

content = content.replace(
  '<td className="p-4 text-slate-500 truncate max-w-[120px]" title={liq.department}>{liq.department}</td>',
  '<td className="p-4 text-slate-500 truncate max-w-[120px]" title="N/A">N/A</td>'
);

content = content.replace(
  '<td className="p-4 text-right font-mono font-medium text-slate-600">{formatCurrency(liq.amountReleased)}</td>',
  '<td className="p-4 text-right font-mono font-medium text-slate-600">{formatCurrency(liq.totalReleased)}</td>'
);

content = content.replace(
  '<td className="p-4 text-right font-mono font-bold text-slate-700">{formatCurrency(liq.amountLiquidated)}</td>',
  '<td className="p-4 text-right font-mono font-bold text-slate-700">{formatCurrency(liq.totalSpent)}</td>'
);

content = content.replace(
  /onClick=\{\(\) => \{\n\s*setUpdateLiqId\(liq\.id\);\n\s*setUpdateStatus\(liq\.status as any\);\n\s*\}\}/g,
  'onClick={() => { /* Disabled direct status update in new flow */ }} disabled={true}'
);

content = content.replace(
  /setUpdateStatus\(e\.target\.value\)/g,
  'setUpdateStatus(e.target.value as any)'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
