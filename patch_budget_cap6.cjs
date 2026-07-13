const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                            <span className="font-semibold text-slate-500">Fund-Utilization Status:</span>
                            <span className="font-black text-slate-800">{b.budgetPercentageUsed}% spent</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={\`h-full rounded-full \${isOverspent ? "bg-rose-500" : b.budgetPercentageUsed > 75 ? "bg-amber-500" : "bg-blue-600"}\`}
                              style={{ width: \`\${Math.min(b.budgetPercentageUsed, 100)}%\` }}
                            />
                          </div>
                        </div>
                      </div>`;

const replacement = `                            <span className="font-semibold text-slate-500">Fund-Utilization Status:</span>
                            <span className="font-black text-slate-800">{b.budgetPercentageUsed}% spent</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={\`h-full rounded-full \${isOverspent ? "bg-rose-500" : b.budgetPercentageUsed > 75 ? "bg-amber-500" : "bg-blue-600"}\`}
                              style={{ width: \`\${Math.min(b.budgetPercentageUsed, 100)}%\` }}
                            />
                          </div>
                          {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && (
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                              <button
                                onClick={() => {
                                  const newCap = prompt("Enter new Budget Fund Pool Cap for " + b.department + ":", b.budgetAllocation.toString());
                                  if (newCap !== null && !isNaN(Number(newCap))) {
                                    apiCall("/api/budgets/" + b.id, {
                                      method: "PUT",
                                      body: JSON.stringify({ budgetAllocation: Number(newCap) })
                                    }).then(res => {
                                      if(res.status === "success") {
                                        setBudgets(budgets.map(bg => bg.id === b.id ? res.data : bg));
                                      }
                                    });
                                  }
                                }}
                                className="text-[10px] uppercase font-mono tracking-wider text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 cursor-pointer font-bold border"
                              >
                                Set Budget Fund Pool Cap
                              </button>
                            </div>
                          )}
                        </div>
                      </div>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Budget Cap UI added to the second chart!");
} else {
    console.log("Target not found in the second chart (attempt 6)!");
}
