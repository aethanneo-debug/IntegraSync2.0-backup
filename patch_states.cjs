const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `  // For budget edit
  const [editingBudget, setEditingBudget] = useState<BudgetAllocation | null>(null);
  const [newAllocationVal, setNewAllocationVal] = useState("");`;

const replacement = `  // For budget edit
  const [editingBudget, setEditingBudget] = useState<BudgetAllocation | null>(null);
  const [newAllocationVal, setNewAllocationVal] = useState("");
  const [editingHsacBudgetId, setEditingHsacBudgetId] = useState<string | null>(null);
  const [newHsacApprVal, setNewHsacApprVal] = useState("");
  const [editingBudgetCapId, setEditingBudgetCapId] = useState<string | null>(null);
  const [newBudgetCapVal, setNewBudgetCapVal] = useState("");`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
