const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// The dynamic import was: import('../utils').then(({ downloadCSV }) => {
// We replace it with:
content = content.replace(
  /import\('\.\.\/utils'\)\.then\(\(\{ downloadCSV \}\) => \{([\s\S]*?)downloadCSV\([\s\S]*?\}\);/,
  `{
                            const data = activeBudgets.map(b => ({
                                "UACS Code": b.uacsCode || "N/A",
                                "Department": b.department,
                                "Total Allocation": b.totalAllocation,
                                "Obligations Incurred": b.budgetUtilized,
                                "Unobligated Balance": b.totalAllocation - b.budgetUtilized
                            }));
                            downloadCSV(data, ["UACS Code", "Department", "Total Allocation", "Obligations Incurred", "Unobligated Balance"], "HSAC_FAR1_CONSOLIDATED_" + consolidationValue + ".csv");
                          }`
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
