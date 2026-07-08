const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

// 1. Add collapsedMenus state
content = content.replace(
  'const role = user.role;',
  'const role = user.role;\n  const [collapsedMenus, setCollapsedMenus] = React.useState<string[]>([]);'
);

// 2. Add subItems to finance just for the arrow indication (the actual click logic for finance subitems is handled separately)
content = content.replace(
  /id: "finance",\s*label: "Financial Tracking",\s*icon: FileText,\s*visible: \[UserRole\.SUPER_ADMIN, UserRole\.FINANCE_OFFICER\]\.includes\(role\)/,
  `id: "finance",\n      label: "Financial Tracking",\n      icon: FileText,\n      visible: [UserRole.SUPER_ADMIN, UserRole.FINANCE_OFFICER].includes(role),\n      subItems: [] // Added so the arrow renders, actual items rendered conditionally`
);

// 3. Update the arrow rendering condition to include finance
content = content.replace(
  /\{item\.subItems && \(\s*isActive \? <ChevronDown size=\{14\} className="text-white shrink-0" \/> : <ChevronRight size=\{14\} className="text-slate-400 shrink-0" \/>\s*\)\}/,
  `{(item.subItems || item.id === "finance") && (
                    (isActive && !collapsedMenus.includes(item.id)) ? <ChevronDown size={14} className="text-white shrink-0" /> : <ChevronRight size={14} className="text-slate-400 shrink-0" />
                  )}`
);

// 4. Update the onClick logic for the parent button
content = content.replace(
  `onClick={() => {
                    // Toggle main item, or open it if it has sub items
                    if (item.subItems) {
                      if (!isActive) {
                        setActiveTab(item.subItems[0].id); // default to first sub item
                      }
                    } else {
                      setActiveTab(item.id);
                    }
                    
                    if (item.id === "finance" && setActiveFinanceSubTab) {
                      setActiveFinanceSubTab("dashboard");
                    }
                  }}`,
  `onClick={() => {
                    if (item.subItems || item.id === "finance") {
                      if (isActive) {
                        if (collapsedMenus.includes(item.id)) {
                          setCollapsedMenus(prev => prev.filter(id => id !== item.id));
                        } else {
                          setCollapsedMenus(prev => [...prev, item.id]);
                        }
                      } else {
                        setCollapsedMenus(prev => prev.filter(id => id !== item.id));
                        if (item.id === "finance") {
                          setActiveTab("finance");
                          if (setActiveFinanceSubTab) setActiveFinanceSubTab("dashboard");
                        } else if (item.subItems && item.subItems.length > 0) {
                          setActiveTab(item.subItems[0].id);
                        } else {
                          setActiveTab(item.id);
                        }
                      }
                    } else {
                      setActiveTab(item.id);
                    }
                  }}`
);

// 5. Update the rendering of nested sub-menus to check collapsedMenus
content = content.replace(
  `{/* NESTED SUB-MENU */}
                {item.subItems && isActive && (`,
  `{/* NESTED SUB-MENU */}
                {item.subItems && item.id !== "finance" && isActive && !collapsedMenus.includes(item.id) && (`
);

content = content.replace(
  `{/* NESTED SUB-MENU ONLY FOR ACTIVE FINANCIAL TRACKING VIEW */}
                {item.id === "finance" && isActive && (`,
  `{/* NESTED SUB-MENU ONLY FOR ACTIVE FINANCIAL TRACKING VIEW */}
                {item.id === "finance" && isActive && !collapsedMenus.includes(item.id) && (`
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
