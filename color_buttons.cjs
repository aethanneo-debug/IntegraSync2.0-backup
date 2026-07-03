const fs = require('fs');

// HR File
let hrContent = fs.readFileSync('src/components/HrUnifiedRequests.tsx', 'utf8');
hrContent = hrContent.replace(
  /className=\{\`flex-1 py-2 text-xs font-bold rounded-lg border \$\{modalActionType === "return" \? "bg-amber-[^"]+" : "[^"]+"\}\`\}/,
  'className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${modalActionType === "return" ? "bg-amber-600 text-white border-amber-700 ring-2 ring-amber-600/20 shadow-inner" : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"}`}'
);

hrContent = hrContent.replace(
  /className=\{\`flex-1 py-2 text-xs font-bold rounded-lg border \$\{modalActionType === "verify" \? "bg-blue-[^"]+" : "[^"]+"\}\`\}/,
  'className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${modalActionType === "verify" ? "bg-blue-600 text-white border-blue-700 ring-2 ring-blue-600/20 shadow-inner" : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"}`}'
);
fs.writeFileSync('src/components/HrUnifiedRequests.tsx', hrContent);

// Admin File
let adminContent = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');
adminContent = adminContent.replace(
  /className=\{\`flex-1 py-2 text-xs font-bold rounded-lg border \$\{modalActionType === "reject" \? "bg-amber-[^"]+" : "[^"]+"\}\`\}/,
  'className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${modalActionType === "reject" ? "bg-rose-600 text-white border-rose-700 ring-2 ring-rose-600/20 shadow-inner" : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"}`}'
);

adminContent = adminContent.replace(
  /className=\{\`flex-1 py-2 text-xs font-bold rounded-lg border \$\{modalActionType === "approve" \? "bg-green-[^"]+" : "[^"]+"\}\`\}/,
  'className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${modalActionType === "approve" ? "bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-600/20 shadow-inner" : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"}`}'
);
fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', adminContent);
