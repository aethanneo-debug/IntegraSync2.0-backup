const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace(
  'useEffect(() => {\n    fetchFinanceAddons();\n  }, [activeSubTab]);',
  'useEffect(() => {\n    fetchFinanceAddons();\n  }, [activeSubTab, activeFiscalYear]);'
);

content = content.replace(
  'const resBud = await apiCall("/api/budgets").catch(() => ({ status: "error", data: [] }));',
  'const resBud = await apiCall(`/api/budgets?fiscalYearLabel=${activeFiscalYear || ""}`).catch(() => ({ status: "error", data: [] }));'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched deps");
