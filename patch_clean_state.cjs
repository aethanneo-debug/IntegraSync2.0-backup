const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

code = code.replace('const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);\n', '');
code = code.replace('const [addBudgetForm, setAddBudgetForm] = useState({ department: "Adjudication Division", ps: "", mooe: "", co: "" });\n', '');
code = code.replace('const [editingBudgetCapId, setEditingBudgetCapId] = useState<string | null>(null);\n', '');
code = code.replace('const [newBudgetCapVal, setNewBudgetCapVal] = useState("");\n', '');
code = code.replace('const [editingBudgetBreakdown, setEditingBudgetBreakdown] = useState({ ps: "", mooe: "", co: "" });\n', '');

fs.writeFileSync('src/components/FinanceView.tsx', code);
