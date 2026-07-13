const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const regex = /\n       className="text-slate-400 hover:text-white p-1">[\s\S]*?Save Treasury Cap\s*<\/button>\s*<\/div>\s*<\/form>\s*<\/div>\s*<\/div>\s*\)\}/;

if (regex.test(content)) {
    content = content.replace(regex, "");
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Replaced corrupted modal");
} else {
    console.log("Corrupted modal not found");
}
