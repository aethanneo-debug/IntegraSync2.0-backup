const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

// State
content = content.replace(
  'const [filterStatus, setFilterStatus] = useState<string>("All");',
  'const [filterStatus, setFilterStatus] = useState<string>("All");\n  const [filterDivision, setFilterDivision] = useState<string>("All");'
);

// Filtering logic
content = content.replace(
  `const filteredItems = allItems.filter(item => {
    if (filterCategory !== "All" && item._category !== filterCategory) return false;
    // Map status for unified filtering`,
  `const filteredItems = allItems.filter(item => {
    if (filterCategory !== "All" && item._category !== filterCategory) return false;
    if (filterDivision !== "All" && item._division !== filterDivision) return false;
    // Map status for unified filtering`
);

// Analytics calculation
content = content.replace(
  'const filteredItems = allItems.filter(item => {',
  `// Calculate Summary & Analytics
  const totalRequests = allItems.length;
  
  const getUnifiedStatus = (item) => {
    let stat = item.status;
    if (stat === "Endorsed to Chief") stat = "Pending";
    if (stat === "Under Review") stat = "Pending";
    if (stat === "Pending Submission") stat = "Pending";
    if (stat === "Submitted") stat = "Pending";
    if (stat === "Completed") stat = "Approved";
    if (stat === "Returned") stat = "Rejected";
    return stat;
  };
  
  const pendingRequests = allItems.filter(i => getUnifiedStatus(i) === "Pending").length;
  const approvedRequests = allItems.filter(i => getUnifiedStatus(i) === "Approved").length;
  const rejectedRequests = allItems.filter(i => getUnifiedStatus(i) === "Rejected").length;

  const divisionCounts = allItems.reduce((acc, item) => {
    const div = item._division || "Unknown Division";
    acc[div] = (acc[div] || 0) + 1;
    return acc;
  }, {});
  
  const chartData = Object.keys(divisionCounts).map((key, i) => ({
    name: key,
    value: divisionCounts[key],
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'][i % 7]
  }));
  
  const filteredItems = allItems.filter(item => {`
);

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
