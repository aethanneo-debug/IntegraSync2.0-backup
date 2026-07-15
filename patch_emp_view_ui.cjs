const fs = require('fs');
let code = fs.readFileSync('src/components/EmployeesView.tsx', 'utf8');

const salaryHtml = `
                {/* POSITION, SALARY AND DIVISION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">Title / Position *</label>
                    <input
                      required
                      type="text"
                      placeholder="Administrative Officer IV"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">Salary (Initial) *</label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 50000"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
                `;
                
code = code.replace(
  /\{\/\* POSITION AND DIVISION \*\/\}\s*<div className="space-y-1">\s*<label[^>]+>Title \/ Position \*\<\/label>\s*<input\s*required\s*type="text"\s*placeholder="Administrative Officer IV"\s*value=\{formData\.position\}\s*onChange=\{\(e\) => setFormData\(\{ \.\.\.formData, position: e\.target\.value \}\)\}\s*className="[^"]+"\s*\/>\s*<\/div>/,
  salaryHtml
);

fs.writeFileSync('src/components/EmployeesView.tsx', code);
console.log("EmployeesView UI patched");
