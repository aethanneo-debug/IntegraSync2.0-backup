const fs = require('fs');
let content = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const target = `import React, { useState, useEffect } from "react";`;
const replacement = `import React, { useState, useEffect } from "react";\nimport { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', content);
