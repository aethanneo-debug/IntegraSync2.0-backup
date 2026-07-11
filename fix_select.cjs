const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

content = content.replace(
  '          <select \n            value={filterStatus} \n            onChange={e => setFilterStatus(e.target.value)}\n            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"\n          >',
  '          <select \n            value={filterDivision} \n            onChange={e => setFilterDivision(e.target.value)}\n            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"\n          >\n            <option value="All">All Divisions</option>\n            {chartData.map(d => (\n              <option key={d.name} value={d.name}>{d.name}</option>\n            ))}\n          </select>\n          <select \n            value={filterStatus} \n            onChange={e => setFilterStatus(e.target.value)}\n            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"\n          >'
);

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
