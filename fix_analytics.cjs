const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

// First, move the filtering up.
const filterCode = `
  const filteredItems = allItems.filter(item => {
    let catMatch = true;
    if (filterCategory !== "All") {
      if (["Personnel Request", "Liquidation", "Budget Request"].includes(filterCategory)) {
        catMatch = item._category === filterCategory;
      } else {
        catMatch = item.requestType === filterCategory || item.leaveType === filterCategory;
      }
    }
    if (filterDivision !== "All" && item._division !== filterDivision) return false;
    
    // Map status for unified filtering
    let stat = item.status;
    if (stat === "Endorsed to Chief") stat = "Pending";
    if (stat === "Under Review") stat = "Pending";
    if (stat === "Pending Submission") stat = "Pending";
    if (stat === "Submitted") stat = "Pending";
    if (stat === "Completed") stat = "Approved";
    if (stat === "Returned") stat = "Rejected";

    let statMatch = filterStatus === "All" || stat === filterStatus;
    
    return catMatch && statMatch;
  });
`;

content = content.replace(
  /const filteredItems = allItems\.filter\(item => \{[\s\S]*?return catMatch && statMatch;\s*\}\);/,
  ''
);

content = content.replace(
  '  const totalRequests = allItems.length;',
  filterCode + '\n  const totalRequests = filteredItems.length;'
);

content = content.replace(
  /const pendingRequests = allItems\.filter/g,
  'const pendingRequests = filteredItems.filter'
);
content = content.replace(
  /const approvedRequests = allItems\.filter/g,
  'const approvedRequests = filteredItems.filter'
);
content = content.replace(
  /const rejectedRequests = allItems\.filter/g,
  'const rejectedRequests = filteredItems.filter'
);
content = content.replace(
  /const divisionCounts = allItems\.reduce/g,
  'const divisionCounts = filteredItems.reduce'
);

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
