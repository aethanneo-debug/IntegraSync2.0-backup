const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `  const [editingBudgetCapId, setEditingBudgetCapId] = useState<string | null>(null);
  const [newBudgetCapVal, setNewBudgetCapVal] = useState("");`;

const replacement = `  const [editingBudgetCapId, setEditingBudgetCapId] = useState<string | null>(null);
  const [newBudgetCapVal, setNewBudgetCapVal] = useState("");
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
