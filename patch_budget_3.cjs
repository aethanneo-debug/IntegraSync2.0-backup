const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const regex = /\{\/\* EDIT BUDGET MODAL \*\/\}\n\s*\{isBudgetModalOpen && editingBudget && \([\s\S]*?\)\}/;

if (regex.test(content)) {
    content = content.replace(regex, "");
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Replaced modal using regex");
} else {
    console.log("Modal not found using regex");
}
