const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  'const list = db.activities.filter(a => a.assignedEmployeeId === employeeId);',
  `const empRecord = db.employees.find((e: any) => e.employeeId === employeeId);
    const altId = empRecord ? empRecord.id : null;
    const list = db.activities.filter((a: any) => a.assignedEmployeeId === employeeId || a.assignedEmployeeId === altId);`
);

fs.writeFileSync('server.ts', content);
