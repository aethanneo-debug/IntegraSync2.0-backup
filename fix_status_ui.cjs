const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

// Fix status badge
content = content.replace(
  /className=\{\`text-\[10px\] px-2\.5 py-1 rounded-full font-semibold font-mono tracking-wider border \$\{\s+\(usr\.status \|\| "Active"\) === "Active"\s+\? "bg-emerald-50 text-emerald-700 border-emerald-200"\s+: "bg-rose-50 text-rose-700 border-rose-200"\s+\}\`\}/,
  'className={`text-[10px] px-2.5 py-1 rounded-full font-semibold font-mono tracking-wider border ${usr.status === "Archived" ? "bg-slate-100 text-slate-600 border-slate-300" : (usr.status || "Active") === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}'
);

// Fix Activate/Deactivate logic
content = content.replace(
  /const nextStatus = \(usr\.status \|\| "Active"\) === "Active" \? "Deactivated" : "Active";/,
  'const nextStatus = (usr.status || "Active") === "Active" ? "Deactivated" : "Active";' // actually we can just let it be that, wait, if it's archived, it becomes active.
);

content = content.replace(
  /<button\s+type="button"\s+onClick=\{async \(\) => \{\s+const nextStatus = \(usr\.status \|\| "Active"\) === "Active" \? "Deactivated" : "Active";/m,
  '<button\n                              type="button"\n                              onClick={async () => {\n                                const nextStatus = (usr.status === "Archived" || usr.status === "Deactivated") ? "Active" : "Deactivated";'
);

content = content.replace(
  /className=\{\`p-1 px-2\.5 py-1\.5 rounded text-xs flex items-center space-x-1 cursor-pointer transition-colors \$\{\s+\(usr\.status \|\| "Active"\) === "Active"\s+\? "hover:bg-amber-50 text-amber-600 hover:text-amber-700"\s+: "hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700"\s+\}\`\}/,
  'className={`p-1 px-2.5 py-1.5 rounded text-xs flex items-center space-x-1 cursor-pointer transition-colors ${(usr.status || "Active") === "Active" ? "hover:bg-amber-50 text-amber-600 hover:text-amber-700" : "hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700"}`}'
);

content = content.replace(
  /<span>\{\(usr\.status \|\| "Active"\) === "Active" \? "Deactivate" : "Activate"\}<\/span>/,
  '<span>{usr.status === "Archived" ? "Restore" : (usr.status || "Active") === "Active" ? "Deactivate" : "Activate"}</span>'
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
