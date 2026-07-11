const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const downloadFunc = `
  const downloadBase64File = (name: string, content: string) => {
    if (!content) {
      alert("No printable file attachments scanned for this mock metadata row.");
      return;
    }
    const link = document.createElement("a");
    link.href = content;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
`;

content = content.replace(
  '// Load backend arrays on mount and updates',
  downloadFunc + '\\n  // Load backend arrays on mount and updates'
);

content = content.replace(
  /<div key=\{i\} className="flex items-center space-x-1 py-1 px-2\.5 bg-white border border-slate-150 rounded text-\[10px\] text-slate-600 font-mono">/g,
  '<div key={i} onClick={() => downloadBase64File(doc.name || doc.filename, doc.content)} className="flex items-center space-x-1 py-1 px-2.5 bg-white border border-slate-150 rounded text-[10px] text-slate-600 font-mono cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-colors" title="Click to view/download attachment">'
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
