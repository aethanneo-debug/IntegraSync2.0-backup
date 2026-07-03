const fs = require('fs');

let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

// Replace Trash2 with Archive in imports
content = content.replace('import { UserPlus, UserCheck, KeyRound, Save, X, Edit, Trash2 } from "lucide-react";', 
'import { UserPlus, UserCheck, KeyRound, Save, X, Edit, Trash2, Archive } from "lucide-react";');
if(!content.includes('Archive')) {
  content = content.replace('import { UserPlus, UserCheck, KeyRound, Save, X, Edit, Trash2 } from "lucide-react";', 
  'import { UserPlus, UserCheck, KeyRound, Save, X, Edit, Archive } from "lucide-react";');
}
if(!content.includes('Archive')) {
  content = content.replace(/import \{.*?\} from "lucide-react";/, match => {
    if(match.includes('Archive')) return match;
    return match.replace('}', ', Archive }');
  });
}

content = content.replace(
  /async function handleDelete\(id: string\) \{[\s\S]*?try \{([\s\S]*?)const res = await apiCall\(\`\/api\/admin\/users\/\$\{id\}\`, \{ method: "DELETE" \}\);/,
  \`async function handleDelete(id: string) {
    if (!window.confirm("Are you absolutely sure you want to archive this user account credential?")) {
      return;
    }
    setError("");
    try {
      const res = await apiCall(\\\`/api/admin/users/\\\${id}\\\`, {
        method: "PUT",
        body: JSON.stringify({ status: "Archived" })
      });\`
);

content = content.replace(
  /alert\("User account permanently deleted\."\);/,
  'alert("User account archived successfully.");'
);

content = content.replace(
  /<button\s+onClick=\{\(\) => handleDelete\(usr\.id\)\}\s+className="p-1 px-2\.5 py-1\.5 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-600 text-xs flex items-center space-x-1 cursor-pointer transition-colors"\s+>\s+<Trash2 size=\{12\} \/>\s+<span>Delete<\/span>\s+<\/button>/,
  \`<button
                              onClick={() => handleDelete(usr.id)}
                              className="p-1 px-2.5 py-1.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <Archive size={12} />
                              <span>Archive</span>
                            </button>\`
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);

let typesContent = fs.readFileSync('src/types.ts', 'utf8');
typesContent = typesContent.replace('status?: "Active" | "Deactivated";', 'status?: "Active" | "Deactivated" | "Archived";');
fs.writeFileSync('src/types.ts', typesContent);
