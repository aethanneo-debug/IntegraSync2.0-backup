const fs = require('fs');
let clientContent = fs.readFileSync('src/components/ActivitiesView.tsx', 'utf8');

// Add budgets state
clientContent = clientContent.replace(
  'const [employees, setEmployees] = useState<any[]>([]);',
  'const [employees, setEmployees] = useState<any[]>([]);\n  const [budgets, setBudgets] = useState<any[]>([]);'
);

// Update initial form state to use empty budget ID
clientContent = clientContent.replace(
  'budgetId: "b-2",',
  'budgetId: "",'
);

// Update form reset in handleSubmit
clientContent = clientContent.replace(
  'budgetId: "b-2",',
  'budgetId: "",'
);

// Update handleSubmit check
clientContent = clientContent.replace(
  'if (!formData.title || !formData.allottedBudget || !formData.assignedEmployeeId) {',
  'if (!formData.title || !formData.allottedBudget || !formData.budgetId || !formData.assignedEmployeeId) {'
);
clientContent = clientContent.replace(
  'setError("Please fill in all required fields (Title, Budget, Assigned Employee).");',
  'setError("Please fill in all required fields (Title, Budget, Division Budget, Assigned Employee).");'
);

// Update fetchData
const fetchTarget = `      const [actRes, empRes] = await Promise.all([
        apiCall("/api/activities"),
        apiCall("/api/employees")
      ]);
      if (actRes.status === "success") setActivities(actRes.data);
      if (empRes.status === "success") setEmployees(empRes.data);`;
const fetchReplacement = `      const [actRes, empRes, budRes] = await Promise.all([
        apiCall("/api/activities"),
        apiCall("/api/employees"),
        apiCall("/api/finance/budgets")
      ]);
      if (actRes.status === "success") setActivities(actRes.data);
      if (empRes.status === "success") setEmployees(empRes.data);
      if (budRes.status === "success") setBudgets(budRes.data);`;
clientContent = clientContent.replace(fetchTarget, fetchReplacement);

// Add budget selection dropdown
const dropdownTarget = `              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Assign To Employee *</label>`;
const dropdownReplacement = `              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Division Budget Allocation *</label>
                <select
                  required
                  value={formData.budgetId}
                  onChange={e => setFormData({...formData, budgetId: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white mb-4"
                >
                  <option value="" disabled>-- Select Division Budget --</option>
                  {budgets.map(bud => (
                    <option key={bud.id} value={bud.id}>{bud.department} (Available: ₱{Number(bud.remainingBudget).toLocaleString()})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Assign To Employee *</label>`;
clientContent = clientContent.replace(dropdownTarget, dropdownReplacement);

fs.writeFileSync('src/components/ActivitiesView.tsx', clientContent);
