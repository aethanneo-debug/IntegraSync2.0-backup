const fs = require('fs');
let code = fs.readFileSync('src/components/PersonalDataSheetForm.tsx', 'utf8');

const replacement = `
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderField('bloodType', 'Blood Type')}
                    {renderField('gsisId', 'GSIS ID No.')}
                    {renderField('pagibigId', 'PAG-IBIG ID No.')}
                    {renderField('philhealthId', 'PhilHealth No.')}
                    {renderField('sssId', 'SSS No.')}
                    {renderField('tinNo', 'TIN No.')}
                    {renderField('agencyEmployeeNo', 'Agency Employee No.')}
                    {renderField('position', 'Position')}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Salary</label>
                      <input 
                        type="number" 
                        name="salary" 
                        value={formData.salary || ''} 
                        onChange={handleChange} 
                        className={\`border border-slate-300 p-2 text-xs rounded w-full \${user.role === 'Administrator / Division Chief' ? '' : 'bg-slate-200 cursor-not-allowed'}\`}
                        readOnly={user.role !== 'Administrator / Division Chief'}
                      />
                    </div>
                  </div>
`;

code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 gap-4">\s*\{renderField\('bloodType', 'Blood Type'\)\}\s*\{renderField\('gsisId', 'GSIS ID No\.'\)\}\s*\{renderField\('pagibigId', 'PAG-IBIG ID No\.'\)\}\s*\{renderField\('philhealthId', 'PhilHealth No\.'\)\}\s*\{renderField\('sssId', 'SSS No\.'\)\}\s*\{renderField\('tinNo', 'TIN No\.'\)\}\s*\{renderField\('agencyEmployeeNo', 'Agency Employee No\.'\)\}\s*<\/div>/,
  replacement
);

fs.writeFileSync('src/components/PersonalDataSheetForm.tsx', code);
console.log("PDS form patched UI grid");
