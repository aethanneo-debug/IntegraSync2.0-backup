const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  '        email: employee.email,\n        contactNumber: employee.contactNumber,\n        address: employee.address\n      },',
  '        email: employee.email,\n        contactNumber: employee.contactNumber,\n        address: employee.address,\n        salary: employee.salary,\n        position: employee.position\n      },'
);

fs.writeFileSync('server.ts', code);
console.log("Server PDS Profile patched");
