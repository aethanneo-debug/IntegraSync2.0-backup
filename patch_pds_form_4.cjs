const fs = require('fs');
let code = fs.readFileSync('src/components/PersonalDataSheetForm.tsx', 'utf8');

const printReplacement = `
            <tr>
              <td className="border border-black p-1 bg-gray-200">15. AGENCY EMPLOYEE NO.</td>
              <td className="border border-black p-1">{formData.agencyEmployeeNo}</td>
              <td className="border border-black p-1 bg-gray-200">16. SALARY</td>
              <td className="border border-black p-1">{formData.salary}</td>
            </tr>
            <tr>
              <td colSpan={2} className="border border-black p-1 bg-gray-200"></td>
              <td className="border border-black p-1 bg-gray-200">17. POSITION</td>
              <td className="border border-black p-1">{formData.position}</td>
            </tr>
`;

code = code.replace(
  '<tr><td className="border border-black p-1 bg-gray-200">15. AGENCY EMPLOYEE NO.</td><td className="border border-black p-1">{formData.agencyEmployeeNo}</td><td colSpan={2} className="border border-black p-1 bg-gray-200"></td></tr>',
  printReplacement
);

fs.writeFileSync('src/components/PersonalDataSheetForm.tsx', code);
console.log("PDS form patched UI print");
