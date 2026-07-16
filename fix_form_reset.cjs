const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

code = code.replace(
  '                        handleCreateBudget(addBudgetForm.department, ps, mooe, co);\n                        setIsAddBudgetOpen(false);',
  '                        handleCreateBudget(addBudgetForm.department, ps, mooe, co);\n                        setIsAddBudgetOpen(false);\n                        setAddBudgetForm({ department: "Adjudication Division", ps: "", mooe: "", co: "" });'
);

fs.writeFileSync('src/components/FinanceView.tsx', code);
