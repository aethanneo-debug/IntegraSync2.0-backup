const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const duplicateEditBlockStart = `                        {[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && (
                          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">`;

// Instead of trying to match the exact massive block, let's use regex to remove it.
// It starts with `{[UserRole.SUPER_ADMIN, UserRole.BUDGET_OFFICER].includes(user.role) && (` inside the `budgets.map` of `Departmental Budget Pools`.
