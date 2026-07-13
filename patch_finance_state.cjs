const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target1 = `  const [budgets, setBudgets] = useState<BudgetAllocation[]>([]);`;
const replacement1 = `  const [budgets, setBudgets] = useState<BudgetAllocation[]>([]);
  const [hsacBudgets, setHsacBudgets] = useState<any[]>([]);`;

const target2 = `      const resBud = await apiCall("/api/budgets").catch(() => ({ status: "error", data: [] }));
      if (Array.isArray(resBud)) {
        setBudgets(resBud); // Assuming endpoint returns array
      } else if (resBud.status === "success") {
        setBudgets(resBud.data);
      }`;
const replacement2 = `      const resBud = await apiCall("/api/budgets").catch(() => ({ status: "error", data: [] }));
      if (Array.isArray(resBud)) {
        setBudgets(resBud); // Assuming endpoint returns array
      } else if (resBud.status === "success") {
        setBudgets(resBud.data);
      }

      const resHb = await apiCall("/api/hsac-budgets").catch(() => ({ status: "error", data: [] }));
      if (resHb.status === "success") {
        setHsacBudgets(resHb.data);
      }`;

if (content.includes(target1) && content.includes(target2)) {
    content = content.replace(target1, replacement1);
    content = content.replace(target2, replacement2);
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Finance state patched");
} else {
    console.log("Targets not found!");
}
