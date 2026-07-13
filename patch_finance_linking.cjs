const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `{submissions.filter(s => s.status === "Completed").map((l) => (`;
const replacement = `{submissions.filter(s => s.status === "Completed" && !budgetLinks.some(bl => bl.liquidationNo === s.submissionNo)).map((l) => (`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Replaced finance linking dropdown successfully.");
} else {
    console.log("Target not found in FinanceView!");
}
