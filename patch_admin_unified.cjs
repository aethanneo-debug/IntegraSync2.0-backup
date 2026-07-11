const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

content = content.replace(
  /const \[reqRes, subRes, budgetRes\] = await Promise\.all\(\[\s*apiCall\("\/api\/requests"\),\s*apiCall\("\/api\/liquidation-submissions"\),\s*apiCall\("\/api\/budget-requests"\)\s*\]\);/,
  `const [reqRes, subRes, budgetRes, empRes] = await Promise.all([
        apiCall("/api/requests"),
        apiCall("/api/liquidation-submissions"),
        apiCall("/api/budget-requests"),
        apiCall("/api/employees")
      ]);
      
      const employees = empRes.status === "success" ? empRes.data : [];
      const getDivision = (empId, dept) => {
        if (dept) return dept;
        const emp = employees.find(e => e.employeeId === empId || e.id === empId);
        return emp ? emp.division : "Unknown Division";
      };`
);

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
