const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// For POST
code = code.replace(
  '  const { username, email, fullName, role, status } = req.body;\n  if (!username || !email || !fullName || !role) {\n    return res.status(400).json({ status: "error", message: "Please supply all required properties" });\n  }',
  '  const { username, email, fullName, role, status, employeeId } = req.body;\n  if (!username || !email || !fullName || !role || !employeeId) {\n    return res.status(400).json({ status: "error", message: "Please supply all required properties including employeeId" });\n  }'
);

code = code.replace(
  '    employeeId: `EMP${Math.floor(100 + Math.random() * 900)}`,\n    createdAt: new Date().toISOString()\n  };\n\n  db.users.push(newUser);',
  '    employeeId,\n    createdAt: new Date().toISOString()\n  };\n\n  db.users.push(newUser);'
);

// For PUT
code = code.replace(
  '  const { fullName, email, role, username, status } = req.body;',
  '  const { fullName, email, role, username, status, employeeId } = req.body;'
);

code = code.replace(
  '  if (username) targetUser.username = username;\n  if (status) {\n    targetUser.status = (status === "Deactivated") ? "Archived" : status;\n  }',
  '  if (username) targetUser.username = username;\n  if (employeeId) targetUser.employeeId = employeeId;\n  if (status) {\n    targetUser.status = (status === "Deactivated") ? "Archived" : status;\n  }'
);

fs.writeFileSync('server.ts', code);
console.log("Server users patched");
