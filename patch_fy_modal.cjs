const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

content = content.replace(
  'const [isFiscalYearModalOpen, setIsFiscalYearModalOpen] = useState(false);',
  'const [isFiscalYearModalOpen, setIsFiscalYearModalOpen] = useState(false);\n  const [isConfirmingNewFy, setIsConfirmingNewFy] = useState(false);'
);

const handleTarget = `  const handleStartNewFiscalYear = async () => {
    const nextYear = String(Number(activeFiscalYear) + 1);
    if (!window.confirm(\`Are you sure you want to start Fiscal Year \${nextYear}? This will close \${activeFiscalYear} and carry over remaining balances to the new fiscal year.\`)) return;`;

const handleReplacement = `  const handleStartNewFiscalYear = async () => {
    const nextYear = String(Number(activeFiscalYear) + 1);`;

content = content.replace(handleTarget, handleReplacement);

const buttonTarget1 = `                <button 
                  onClick={() => handleStartNewFiscalYear()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold py-1.5 px-2.5 uppercase tracking-wider rounded-lg border flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={11} />
                  <span>Start New Fiscal Year</span>
                </button>`;
const buttonReplacement1 = `                <button 
                  onClick={() => setIsConfirmingNewFy(true)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold py-1.5 px-2.5 uppercase tracking-wider rounded-lg border flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={11} />
                  <span>Start New Fiscal Year</span>
                </button>`;

const buttonTarget2 = `                  <button 
                    onClick={() => handleStartNewFiscalYear()}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-[10px] font-bold py-2 px-3 uppercase tracking-wider rounded-lg border flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                  >
                    <Plus size={13} />
                    <span>Start New Fiscal Year</span>
                  </button>`;
const buttonReplacement2 = `                  <button 
                    onClick={() => setIsConfirmingNewFy(true)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-[10px] font-bold py-2 px-3 uppercase tracking-wider rounded-lg border flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                  >
                    <Plus size={13} />
                    <span>Start New Fiscal Year</span>
                  </button>`;

content = content.replace(buttonTarget1, buttonReplacement1);
content = content.replace(buttonTarget2, buttonReplacement2);

const modalTarget = `{isFiscalYearModalOpen && (`;

const modalReplacement = `{isConfirmingNewFy && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
              <h3 className="font-semibold text-sm tracking-tight text-amber-800 flex items-center gap-2">
                <AlertTriangle size={16} />
                Confirm New Fiscal Year
              </h3>
              <button 
                onClick={() => setIsConfirmingNewFy(false)}
                className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">
                Are you sure you want to start Fiscal Year <span className="font-bold">{String(Number(activeFiscalYear) + 1)}</span>? 
              </p>
              <p className="text-xs text-slate-500">
                This will automatically close {activeFiscalYear} and calculate carryover balances for all active division funds. This action cannot be easily reversed.
              </p>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsConfirmingNewFy(false)}
                  className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setIsConfirmingNewFy(false);
                    handleStartNewFiscalYear();
                  }}
                  className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"
                >
                  Confirm & Start
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isFiscalYearModalOpen && (`;

content = content.replace(modalTarget, modalReplacement);

fs.writeFileSync('src/components/FinanceView.tsx', content);
console.log("Patched confirmation modal!");
