const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// 1. Download document replica
content = content.replace(
  /onClick=\{\(\) => alert\(\`Simulating Secure PDF download for: \$\{doc\.filename\}\. Version: V\$\{doc\.versions\?\.length \|\| 1\} certified\.\`\)\}/,
  `onClick={() => {
                                const dummyText = \`DOCUMENT REPLICA\\n\\nFilename: \${doc.filename}\\nType: \${doc.type}\\nUploaded by: \${doc.uploadedBy}\\nDate: \${doc.uploadedAt}\\nVersion: V\${doc.versions?.length || 1}\\n\\n[END OF FILE]\`;
                                const blob = new Blob([dummyText], { type: "text/plain" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = doc.filename + ".txt";
                                a.click();
                                URL.revokeObjectURL(url);
                              }}`
);

// 2. Reviewing scanned PNG/PDF proof
content = content.replace(
  /onClick=\{\(\) => alert\(\`Reviewing Scanned PNG\/PDF proof: \$\{selectedTx\.receiptFilename\}\`\)\}/,
  `onClick={() => {
                            const dummyText = \`RECEIPT PROOF\\n\\nFilename: \${selectedTx.receiptFilename}\\nTransaction Ref: \${selectedTx.transactionId}\\nAmount: \${formatCurrency(selectedTx.amount)}\\n\\n[END OF FILE]\`;
                            const blob = new Blob([dummyText], { type: "text/plain" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = selectedTx.receiptFilename + ".txt";
                            a.click();
                            URL.revokeObjectURL(url);
                          }}`
);

// 3. Consolidate Range button (change from alert to actual CSV download)
content = content.replace(
  /alert\(\`Validated data successfully consolidated for \$\{consolidationValue\}\! Prepared for downstream reports output\.\`\);/,
  `const csvContent = "Consolidation Report," + consolidationValue + "\\n\\nCategory,Amount\\nTotal Income,0.00\\nTotal Expenses,0.00\\nBalance,0.00\\n";
                          const blob = new Blob([csvContent], { type: "text/csv" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "Consolidation_" + consolidationValue + ".csv";
                          a.click();
                          URL.revokeObjectURL(url);`
);

// 4. FAR Form 1 & 1A download (export to CSV using downloadCSV from utils)
content = content.replace(
  /alert\(\`FAR Form 1 & 1A consolidated as a report inside system scope downloads. Filename: HSAC_FAR1_CONSOLIDATED_\$\{consolidationValue\}\.csv\`\);/,
  `import('../utils').then(({ downloadCSV }) => {
                            const data = activeBudgets.map(b => ({
                                "UACS Code": b.uacsCode || "N/A",
                                "Department": b.department,
                                "Total Allocation": b.totalAllocation,
                                "Obligations Incurred": b.budgetUtilized,
                                "Unobligated Balance": b.totalAllocation - b.budgetUtilized
                            }));
                            downloadCSV(data, ["UACS Code", "Department", "Total Allocation", "Obligations Incurred", "Unobligated Balance"], "HSAC_FAR1_CONSOLIDATED_" + consolidationValue + ".csv");
                          });`
);

fs.writeFileSync('src/components/FinanceView.tsx', content);
