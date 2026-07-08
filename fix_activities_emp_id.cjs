const fs = require('fs');
let content = fs.readFileSync('src/components/ActivitiesView.tsx', 'utf8');

content = content.replace(
  'const emp = employees.find(e => e.id === empId);',
  'const emp = employees.find(e => e.employeeId === empId || e.id === empId);'
);

content = content.replace(
  '<option key={emp.id} value={emp.id}>{emp.fullName} ({emp.plantillaNumber || emp.id})</option>',
  '<option key={emp.id} value={emp.employeeId}>{emp.fullName} ({emp.plantillaNumber || emp.employeeId})</option>'
);

fs.writeFileSync('src/components/ActivitiesView.tsx', content);
