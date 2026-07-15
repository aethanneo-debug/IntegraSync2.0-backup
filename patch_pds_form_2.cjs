const fs = require('fs');
let code = fs.readFileSync('src/components/PersonalDataSheetForm.tsx', 'utf8');

code = code.replace(
  '            pHouseNo: emp.address || "",\n          };',
  '            pHouseNo: emp.address || "",\n            salary: emp.salary || "",\n            position: emp.position || "",\n          };'
);

fs.writeFileSync('src/components/PersonalDataSheetForm.tsx', code);
console.log("PDS form patched mapping");
