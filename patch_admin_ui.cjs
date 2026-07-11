const fs = require('fs');
let content = fs.readFileSync('src/components/AdminUnifiedRequests.tsx', 'utf8');

if (!content.includes('import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";')) {
  content = content.replace(
    'import { Check, X, Undo2, Filter, RefreshCcw, Info } from "lucide-react";',
    'import { Check, X, Undo2, Filter, RefreshCcw, Info, PieChart as PieChartIcon, BarChart3 } from "lucide-react";\nimport { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";'
  );
}

fs.writeFileSync('src/components/AdminUnifiedRequests.tsx', content);
