const fs = require('fs');

let clientContent = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');
const target = `        setIsAuditModalOpen(false);
        onRefresh();
        fetchSummary();`;
const replacement = `        setIsAuditModalOpen(false);
        onRefresh();
        fetchSummary();
        fetchFinanceAddons();`;
clientContent = clientContent.replace(target, replacement);

fs.writeFileSync('src/components/FinanceView.tsx', clientContent);
