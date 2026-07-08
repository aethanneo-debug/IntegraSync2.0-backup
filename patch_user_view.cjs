const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

// Update viewMode
content = content.replace(
  'const [search, setSearch] = useState("");',
  'const [search, setSearch] = useState("");\n  const [viewMode, setViewMode] = useState<"active" | "archived">("active");'
);

// Update filteredUsers
const newFilteredUsers = `
  const filteredUsers = users.filter(u => 
    (viewMode === "archived" ? u.status === "Archived" : (u.status || "Active") !== "Archived") &&
    (
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    )
  );`;

content = content.replace(
  /const filteredUsers = users\.filter\(u =>[\s\S]*?u\.role\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\)\n  \);/m,
  newFilteredUsers
);

// Update handleArchive
const newHandleArchive = `
  async function handleArchiveUser(id: string) {
    if (!window.confirm("Are you absolutely sure you want to archive this user account?")) {
      return;
    }
    setError("");
    try {
      const res = await apiCall(\`/api/admin/users/\${id}/archive\`, { 
        method: "POST"
      });
      if (res.status === "success") {
        setSuccess("User account successfully archived.");
        fetchUsers();
      }
    } catch (err: any) {
      setError(err.message || "Could not archive user account.");
    }
  }

  async function handleRestoreUser(id: string) {
    if (!window.confirm("Are you sure you want to restore this user account?")) {
      return;
    }
    setError("");
    try {
      const res = await apiCall(\`/api/admin/users/\${id}/restore\`, { 
        method: "POST"
      });
      if (res.status === "success") {
        setSuccess("User account successfully restored.");
        fetchUsers();
      }
    } catch (err: any) {
      setError(err.message || "Could not restore user account.");
    }
  }`;

content = content.replace(
  /async function handleDelete\(id: string\) \{[\s\S]*?Could not archive user account\."\);\n    \}\n  \}/m,
  newHandleArchive
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
