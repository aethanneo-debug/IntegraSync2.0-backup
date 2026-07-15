const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const replacement = `
  if (data) {
    if (!db.pds) db.pds = [];
    
    // Update salary across the system if Admin modifies it
    if (data.salary !== undefined && req.user.role === UserRole.SUPER_ADMIN) {
      emp.salary = Number(data.salary);
    }
    if (data.position !== undefined) {
      emp.position = data.position;
    }

    const existingIndex = db.pds.findIndex((p: any) => p.employeeId === employeeId);
`;

code = code.replace(
  '  if (data) {\n    if (!db.pds) db.pds = [];\n    const existingIndex = db.pds.findIndex((p: any) => p.employeeId === employeeId);',
  replacement
);

fs.writeFileSync('server.ts', code);
console.log("Server PDS patched");
