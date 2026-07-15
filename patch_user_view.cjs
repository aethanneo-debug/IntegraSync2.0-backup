const fs = require('fs');
let code = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

// 1. Add employees state and fetch
code = code.replace(
  '  const [error, setError] = useState("");\n  const [success, setSuccess] = useState("");',
  '  const [error, setError] = useState("");\n  const [success, setSuccess] = useState("");\n  const [employeeId, setEmployeeId] = useState("");\n  const [employees, setEmployees] = useState<any[]>([]);'
);

code = code.replace(
  '  useEffect(() => {\n    fetchUsers();\n  }, []);',
  '  useEffect(() => {\n    fetchUsers();\n    fetchEmployees();\n  }, []);\n\n  async function fetchEmployees() {\n    try {\n      const res = await apiCall("/api/employees");\n      if (res.status === "success") {\n        setEmployees(res.data);\n      }\n    } catch (err) {\n      console.error(err);\n    }\n  }'
);

// 2. Clear employeeId when opening create modal
code = code.replace(
  '    setFullName("");\n    setSelectedRole(UserRole.EMPLOYEE);',
  '    setFullName("");\n    setEmployeeId("");\n    setSelectedRole(UserRole.EMPLOYEE);'
);

// 3. Set employeeId when editing (if we are storing it in User type)
code = code.replace(
  '    setFullName(usr.fullName);\n    setSelectedRole(usr.role);',
  '    setFullName(usr.fullName);\n    setEmployeeId(usr.employeeId || "");\n    setSelectedRole(usr.role);'
);

// 4. Update handleSubmit
code = code.replace(
  '        // Edit User\n        const res = await apiCall(`/api/admin/users/${editingUser.id}`, {\n          method: "PUT",\n          body: JSON.stringify({ username, email, fullName, role: selectedRole, status: accountStatus })\n        });',
  '        // Edit User\n        const res = await apiCall(`/api/admin/users/${editingUser.id}`, {\n          method: "PUT",\n          body: JSON.stringify({ username, email, fullName, role: selectedRole, status: accountStatus, employeeId })\n        });'
);

code = code.replace(
  '        // Create User\n        const res = await apiCall("/api/admin/users", {\n          method: "POST",\n          body: JSON.stringify({ username, email, fullName, role: selectedRole, status: accountStatus })\n        });',
  '        // Create User\n        if (!employeeId) {\n          setError("Please select an Employee to link to this account.");\n          return;\n        }\n        const res = await apiCall("/api/admin/users", {\n          method: "POST",\n          body: JSON.stringify({ username, email, fullName, role: selectedRole, status: accountStatus, employeeId })\n        });'
);

// 5. Add Employee select dropdown to Modal
const modalStr = `
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded p-2 text-xs focus:outline-none focus:border-blue-500" placeholder="user@hsac.gov.ph" />
            </div>
          </div>
`;

const replaceModalStr = `
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded p-2 text-xs focus:outline-none focus:border-blue-500" placeholder="user@hsac.gov.ph" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Linked Employee Profile</label>
              <select value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="w-full border border-slate-200 rounded p-2 text-xs focus:outline-none focus:border-blue-500">
                <option value="">-- Select Employee --</option>
                {employees.map(emp => (
                  <option key={emp.employeeId} value={emp.employeeId}>{emp.fullName} ({emp.employeeId})</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-500 mt-1">Required to link system accounts to their corresponding HR profiles.</p>
            </div>
          </div>
`;

code = code.replace(modalStr, replaceModalStr);

fs.writeFileSync('src/components/UserAccountsView.tsx', code);
console.log("UserAccountsView patched");
