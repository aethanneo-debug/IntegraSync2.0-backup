const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace(
  '    if (user.status === "Deactivated") {',
  `    if (user.status === "Archived") {
      logEvent(user.id, user.username, user.role, "Blocked Login Attempt", "A blocked login attempt was recorded for an archived account.");
      return res.status(403).json({ status: "error", message: "Your account has been archived. Please contact an administrator for assistance." });
    }
    if (user.status === "Deactivated") {`
);
fs.writeFileSync('server.ts', content);
