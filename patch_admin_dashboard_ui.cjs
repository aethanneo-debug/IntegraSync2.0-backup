const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

const dashboardUI = `
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Requests</p>
              <p className="text-2xl font-black text-slate-800">{totalRequests}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Pending</p>
              <p className="text-2xl font-black text-amber-500">{pendingRequests}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Approved</p>
              <p className="text-2xl font-black text-emerald-500">{approvedRequests}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Rejected</p>
              <p className="text-2xl font-black text-rose-500">{rejectedRequests}</p>
            </div>
          </div>
          
          {/* Division List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-xs font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Requests per Division</h3>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {chartData.map(d => (
                <div key={d.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                    <span className="text-slate-600 truncate max-w-[120px]">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Division Distribution Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col">
          <h3 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2">
            <PieChartIcon size={14} className="text-blue-500" />
            Division-Based Request Analytics
          </h3>
          <div className="flex-1 min-h-[250px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={\`cell-\${index}\`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [\`\${value} Requests\`, name]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No request data available
              </div>
            )}
          </div>
        </div>
      </div>
`;

content = content.replace(
  '  return (\n    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">',
  '  return (\n' + dashboardUI + '\n    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">'
);

content = content.replace(
  '            <option value="All">All Statuses</option>',
  `            <option value="All">All Divisions</option>
            {chartData.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)}
            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>`
);

content = content.replace(
  '          <select \n            value={filterStatus} \n            onChange={e => setFilterStatus(e.target.value)}\n            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"\n          >\n            <option value="All">All Statuses</option>',
  '          <select \n            value={filterDivision} \n            onChange={e => setFilterDivision(e.target.value)}\n            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"\n          >\n            <option value="All">All Divisions</option>\n            {chartData.map(d => (\n              <option key={d.name} value={d.name}>{d.name}</option>\n            ))}\n          </select>\n          <select \n            value={filterStatus} \n            onChange={e => setFilterStatus(e.target.value)}\n            className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"\n          >\n            <option value="All">All Statuses</option>'
);

const finalReplacement = content.lastIndexOf('</div>\n  );\n}');
if (finalReplacement !== -1) {
  content = content.substring(0, finalReplacement) + '</div>\n    </div>\n  );\n}';
}

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
