const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `                                  apiCall("/api/hsac-budgets/" + hb.id, {
                                    method: "PUT",
                                    body: JSON.stringify({ approvedBudget: Number(newAppr) })
                                  }).then(res => {
                                    if(res.status === "success") {
                                      setHsacBudgets(hsacBudgets.map(b => b.id === hb.id ? res.data : b));
                                    }
                                  });`;

const replacement = `                                  apiCall("/api/hsac-budgets/" + hb.id, {
                                    method: "PUT",
                                    body: JSON.stringify({ approvedBudget: Number(newAppr) })
                                  }).then(res => {
                                    if(res.status === "success") {
                                      setHsacBudgets(hsacBudgets.map(b => b.id === hb.id ? res.data : b));
                                      fetchFinanceAddons();
                                    }
                                  });`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/FinanceView.tsx', content);
    console.log("Edit budget logic updated");
} else {
    console.log("Target edit budget not found!");
}
