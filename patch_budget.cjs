const fs = require('fs');
const content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const buttonTarget = `                          {isBudgetOrAdmin && (
                            <button
                              onClick={() => {
                                setEditingBudget(b);
                                setNewAllocationVal(String(b.budgetAllocation));
                                setIsBudgetModalOpen(true);
                              }}
                              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-mono text-[10px] py-1.5 font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            >
                              <Edit2 size={10} className="text-slate-500" />
                              <span>Re-Adjust Fund Pool Cap</span>
                            </button>
                          )}`;

const modalTarget = `      {isBudgetModalOpen && editingBudget && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-100">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider font-mono">Adjust Treasury Cap</h3>
              <button onClick={() => setIsBudgetModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateBudget} className="p-5 space-y-4">
              <p className="text-[11px] text-slate-500 leading-tight">
                Modifying allocation cap of <strong className="text-slate-700 font-mono text-xs">{editingBudget.department}</strong>.
              </p>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block font-bold text-slate-800">New Budget Allocation Limit (PHP) *</label>
                <input
                  required
                  type="number"
                  value={newAllocationVal}
                  onChange={(e) => setNewAllocationVal(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg text-xs font-mono font-bold"
                />
              </div>
              <div className="pt-4 border-t border-slate-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsBudgetModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 border border-slate-850 text-white hover:bg-slate-800 font-semibold px-4 py-1.5 rounded-lg text-xs shadow-sm cursor-pointer"
                >
                  Save Treasury Cap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}`;

let newContent = content;

if (newContent.includes(buttonTarget)) {
    newContent = newContent.replace(buttonTarget, "");
    console.log("Replaced button");
} else {
    console.log("Could not find buttonTarget");
}

if (newContent.includes(modalTarget)) {
    newContent = newContent.replace(modalTarget, "");
    console.log("Replaced modal");
} else {
    console.log("Could not find modalTarget");
}

fs.writeFileSync('src/components/FinanceView.tsx', newContent);
