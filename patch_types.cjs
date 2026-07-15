const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  '  plantillaNumber?: string;\n  status?: "Active" | "Deactivated" | "Archived";',
  '  plantillaNumber?: string;\n  salary?: number;\n  status?: "Active" | "Deactivated" | "Archived";'
);

code = code.replace(
  '  employmentStatus: string;\n  salaryGrade?: number;',
  '  employmentStatus: string;\n  salary?: number;\n  salaryGrade?: number;'
);

fs.writeFileSync('src/types.ts', code);
console.log("Types patched");
