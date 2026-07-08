const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// 1. In PUT /api/admin/users/:id, map "Deactivated" to "Archived"
content = content.replace(
  '  if (status) targetUser.status = status;',
  `  if (status) {
    targetUser.status = (status === "Deactivated") ? "Archived" : status;
  }`
);

// 2. Remove the constraint in /api/admin/users/:id/archive
content = content.replace(
  `  if (targetUser.status !== "Deactivated") {\n    return res.status(400).json({ status: "error", message: "Only deactivated accounts can be archived. Please deactivate the account first." });\n  }`,
  ''
);

fs.writeFileSync('server.ts', content);
