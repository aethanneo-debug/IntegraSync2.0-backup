const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const lastBracket = content.lastIndexOf('}');
if (lastBracket !== -1) {
  content = content.substring(0, content.indexOf('}\\n  const downloadBase64File = (name: string, content: string) => {')) + '}\\n';
}

fs.writeFileSync('src/components/FinanceView.tsx', content);
