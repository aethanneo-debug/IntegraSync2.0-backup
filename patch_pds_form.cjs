const fs = require('fs');
let code = fs.readFileSync('src/components/PersonalDataSheetForm.tsx', 'utf8');

// Add to emptyPdsDefaults
code = code.replace(
  "tinNo: '', agencyEmployeeNo: '', citizenshipType: 'Filipino',",
  "tinNo: '', agencyEmployeeNo: '', salary: '', position: '', citizenshipType: 'Filipino',"
);

// Map employee's initial salary and position to formData when fetched
// Wait, when fetched, where does it populate formData? Let's check `apiCall` for pds-profile.
