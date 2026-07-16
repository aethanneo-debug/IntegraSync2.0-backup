const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

code = code.replace(
  'const [selectedDivisionFilter, setSelectedDivisionFilter] = useState("All Divisions");',
  'const [selectedDivisionFilter, setSelectedDivisionFilter] = useState("Adjudication Division");'
);

code = code.replace(
  '{["All Divisions", "Adjudication Division", "Administrative and Finance Division", "Legal Division"].map((div) => (',
  '{["Adjudication Division", "Administrative and Finance Division", "Legal Division"].map((div) => ('
);

code = code.replace(
  '{div === "All Divisions" ? <Layers size={14} /> : <Building2 size={14} />}',
  '{<Building2 size={14} />}'
);

code = code.replace(
  '<span>{div === "All Divisions" ? "All Programs" : div}</span>',
  '<span>{div}</span>'
);

code = code.replace(
  '.filter(b => selectedDivisionFilter === "All Divisions" || b.department === selectedDivisionFilter)',
  '.filter(b => b.department === selectedDivisionFilter)'
);

fs.writeFileSync('src/components/FinanceView.tsx', code);
