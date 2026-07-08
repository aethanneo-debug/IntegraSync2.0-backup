const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

const tabsJSX = `
      {/* TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        <button
          onClick={() => setViewMode("active")}
          className={\`px-4 py-2 text-sm font-semibold transition-colors \${viewMode === "active" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}\`}
        >
          Active Accounts
        </button>
        <button
          onClick={() => setViewMode("archived")}
          className={\`px-4 py-2 text-sm font-semibold transition-colors \${viewMode === "archived" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}\`}
        >
          Archived Accounts
        </button>
      </div>

      {/* SEARCH AND CONTENT */}
      {search || filteredUsers.length > 0 || viewMode === "archived" ? (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">`;

content = content.replace(
  '      {search || filteredUsers.length > 0 ? (\n        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">',
  tabsJSX
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
