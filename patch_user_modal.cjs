const fs = require('fs');
let code = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

const target = '              <div className="space-y-1">\n                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Clearance & Role</label>';

const replacement = `              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Linked Employee Profile</label>
                <select 
                  value={employeeId} 
                  onChange={e => setEmployeeId(e.target.value)} 
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  required
                >
                  <option value="">-- Select Employee --</option>
                  {employees.map(emp => (
                    <option key={emp.employeeId} value={emp.employeeId}>{emp.fullName} ({emp.employeeId})</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1">Required to link system accounts to their corresponding HR profiles.</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Clearance & Role</label>`;

if (code.includes('Linked Employee Profile')) {
  console.log("Already patched");
} else {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/UserAccountsView.tsx', code);
  console.log("UserAccountsView modal patched successfully");
}
