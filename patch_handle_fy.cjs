const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `  return (
    <div className="flex h-full bg-slate-50 flex-col md:flex-row">`;

const replacement = `  const handleStartNewFiscalYear = async () => {
    const nextYear = String(Number(activeFiscalYear) + 1);
    if (!window.confirm(\`Are you sure you want to start Fiscal Year \${nextYear}? This will close \${activeFiscalYear} and carry over remaining balances to the new fiscal year.\`)) return;
    
    try {
      const res = await apiCall('/api/fiscal-years', {
        method: 'POST',
        body: JSON.stringify({
          label: nextYear,
          start_date: \`\${nextYear}-01-01\`,
          end_date: \`\${nextYear}-12-31\`
        })
      });
      if (res.status === 'success') {
        alert(\`Successfully started Fiscal Year \${nextYear}\`);
        await fetchFinanceAddons();
        setActiveFiscalYear(nextYear);
      } else {
        alert(res.message || "Failed to create new fiscal year");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex h-full bg-slate-50 flex-col md:flex-row">`;

if(content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/FinanceView.tsx', content);
  console.log("Patched handleStartNewFiscalYear");
} else {
  console.log("Target not found");
}
