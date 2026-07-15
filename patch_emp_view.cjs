const fs = require('fs');
let code = fs.readFileSync('src/components/EmployeesView.tsx', 'utf8');

// Add to state
code = code.replace(
  '    position: "",\n    division: "Adjudication Division",',
  '    position: "",\n    salary: "",\n    division: "Adjudication Division",'
);

code = code.replace(
  '          position: "",\n          division: "Adjudication Division",',
  '          position: "",\n          salary: "",\n          division: "Adjudication Division",'
);

// Add to UI. Before "POSITION AND DIVISION" (line 610)
const positionDivisionHtml = `
                {/* POSITION AND DIVISION */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">Title / Position *</label>`;
                  
const salaryHtml = `
                {/* POSITION, SALARY AND DIVISION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">Title / Position *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Attorney IV"
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
                <div className="space-y-1">`;
                
// Let's replace the whole POSITION AND DIVISION section up to Division.
code = code.replace(
  /\{\/\* POSITION AND DIVISION \*\/\}\s*<div className="space-y-1">\s*<label[^>]+>Title \/ Position \*\<\/label>\s*<input\s*required\s*type="text"\s*placeholder="e\.g\. Attorney IV"\s*value=\{formData\.position\}\s*onChange=\{\(e\) => setFormData\(\{ \.\.\.formData, position: e\.target\.value \}\)\}\s*className="[^"]+"\s*\/>\s*<\/div>/,
  salaryHtml
);

fs.writeFileSync('src/components/EmployeesView.tsx', code);
console.log("EmployeesView patched");
