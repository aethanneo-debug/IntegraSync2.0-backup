const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  '    position: data.position,\n    division: data.division,',
  '    position: data.position,\n    salary: data.salary ? Number(data.salary) : undefined,\n    division: data.division,'
);

code = code.replace(
  '    position: data.position || oldRecord.position,\n    division: data.division || oldRecord.division,',
  '    position: data.position || oldRecord.position,\n    salary: data.salary !== undefined ? Number(data.salary) : oldRecord.salary,\n    division: data.division || oldRecord.division,'
);

fs.writeFileSync('server.ts', code);
console.log("Server EMP patched");
