const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

content = content.replace(
  'if (err?.message === "Failed to fetch" || err?.message?.includes("fetch") || err?.toString()?.includes("Failed to fetch")) {',
  'if (err?.message === "Failed to fetch" || err?.message?.includes("fetch") || err?.toString()?.includes("Failed to fetch") || err?.message?.includes("HTML response instead of JSON")) {'
);

fs.writeFileSync('src/components/Header.tsx', content);
console.log("Patched Header.tsx");
