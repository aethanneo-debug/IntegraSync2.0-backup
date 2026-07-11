const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

content = content.replace(
  '  const chartData = Object.keys(divisionCounts).map((key, i) => ({',
  `  const allDivisions = Array.from(new Set(allItems.map(i => i._division || "Unknown Division"))).sort();
  const chartData = Object.keys(divisionCounts).map((key, i) => ({`
);

content = content.replace(
  /\{chartData\.map\(d => \(\s*<option key=\{d\.name\} value=\{d\.name\}>\{d\.name\}<\/option>\s*\)\)\}/g,
  `{allDivisions.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}`
);

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
