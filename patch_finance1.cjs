const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// 1. Update form state
code = code.replace(
  'const [addBudgetForm, setAddBudgetForm] = useState({ department: "Adjudication Division", budgetAllocation: "" });',
  'const [addBudgetForm, setAddBudgetForm] = useState({ department: "Adjudication Division", ps: "", mooe: "", co: "" });'
);

// 2. Update handleCreateBudget
const tgtCreate = `  async function handleCreateBudget(department: string, budgetAllocation: number) {
    try {
      const res = await apiCall(\`/api/finance/budgets\`, {
        method: "POST",
        body: JSON.stringify({ department, budgetAllocation })
      });`;

const replCreate = `  async function handleCreateBudget(department: string, ps: number, mooe: number, co: number) {
    try {
      const res = await apiCall(\`/api/finance/budgets\`, {
        method: "POST",
        body: JSON.stringify({ department, allocatedPS: ps, allocatedMOOE: mooe, allocatedCO: co })
      });`;

code = code.replace(tgtCreate, replCreate);

// 3. Update UI Form
const tgtUIForm = `                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Initial Allocation Fund Cap (PHP)</label>
                        <input
                          type="number"
                          placeholder="e.g. 750000"
                          value={addBudgetForm.budgetAllocation}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, budgetAllocation: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (!addBudgetForm.budgetAllocation) return alert("Allocation amount is required");
                        const val = Number(addBudgetForm.budgetAllocation);
                        if (!isNaN(val)) {
                          const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                          const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                          const approved = hb ? hb.approvedBudget : 0;
                          
                          const otherBudgetsSum = budgets.reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                          if (val + otherBudgetsSum > approved) {
                            alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ".");
                            return;
                          }
                          handleCreateBudget(addBudgetForm.department, val);
                          setIsAddBudgetOpen(false);
                        }
                      }}`;

const replUIForm = `                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Personnel Services (PS)</label>
                        <input
                          type="number"
                          placeholder="e.g. 750000"
                          value={addBudgetForm.ps}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, ps: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Maint. & Other Op. Exp. (MOOE)</label>
                        <input
                          type="number"
                          placeholder="e.g. 500000"
                          value={addBudgetForm.mooe}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, mooe: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Capital Outlays (CO)</label>
                        <input
                          type="number"
                          placeholder="e.g. 200000"
                          value={addBudgetForm.co}
                          onChange={(e) => setAddBudgetForm({ ...addBudgetForm, co: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        const ps = Number(addBudgetForm.ps) || 0;
                        const mooe = Number(addBudgetForm.mooe) || 0;
                        const co = Number(addBudgetForm.co) || 0;
                        const val = ps + mooe + co;
                        if (val <= 0) return alert("Total Allocation amount must be greater than zero");
                        
                        const currentFy = fiscalYears.find(fy => fy.label === activeFiscalYear);
                        const hb = currentFy ? hsacBudgets.find(hb => hb.fiscalYearId === currentFy.id) : null;
                        const approved = hb ? hb.approvedBudget : 0;
                        
                        const otherBudgetsSum = budgets.reduce((sum, bg) => sum + bg.budgetAllocation, 0);
                        if (val + otherBudgetsSum > approved) {
                          alert("Division budget cannot exceed the total approved budget for the fiscal year. Remaining available allocation is " + formatCurrency(approved - otherBudgetsSum) + ".");
                          return;
                        }
                        handleCreateBudget(addBudgetForm.department, ps, mooe, co);
                        setIsAddBudgetOpen(false);
                      }}`;

code = code.replace(tgtUIForm, replUIForm);

fs.writeFileSync('src/components/FinanceView.tsx', code);
console.log("FinanceView form patched.");
