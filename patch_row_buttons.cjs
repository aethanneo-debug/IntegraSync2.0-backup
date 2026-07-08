const fs = require('fs');
let content = fs.readFileSync('src/components/UserAccountsView.tsx', 'utf8');

const newButtons = `                        <div className="flex justify-end items-center space-x-2">
                          {usr.status === "Archived" ? (
                            <button
                              onClick={() => handleRestoreUser(usr.id)}
                              className="p-1 px-2.5 py-1.5 hover:bg-emerald-50 rounded text-emerald-600 hover:text-emerald-700 text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <UserCheck size={12} />
                              <span>Restore</span>
                            </button>
                          ) : (
                            <>
                              {usr.username !== "admin" && usr.id !== currentUser.id && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    const nextStatus = (usr.status === "Deactivated") ? "Active" : "Deactivated";
                                    try {
                                      setLoading(true);
                                      const res = await apiCall(\`/api/admin/users/\${usr.id}\`, {
                                        method: "PUT",
                                        body: JSON.stringify({ status: nextStatus })
                                      });
                                      if (res.status === "success") {
                                        fetchUsers();
                                      }
                                    } catch (err: any) {
                                      setError(err.message || "Failed to alter status.");
                                    } finally {
                                      setLoading(false);
                                    }
                                  }}
                                  className={\`p-1 px-2.5 py-1.5 rounded text-xs flex items-center space-x-1 cursor-pointer transition-colors \${(usr.status || "Active") === "Active" ? "hover:bg-amber-50 text-amber-600 hover:text-amber-700" : "hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700"}\`}
                                >
                                  <UserCheck size={12} />
                                  <span>{(usr.status || "Active") === "Active" ? "Deactivate" : "Activate"}</span>
                                </button>
                              )}
                              {usr.username !== "admin" && (
                                <button
                                  onClick={() => handleResetPassword(usr.id, usr.username)}
                                  className="p-1 px-2.5 py-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                                  title="Reset Password"
                                >
                                  <Key size={12} />
                                  <span>Reset Pass</span>
                                </button>
                              )}
                              <button
                                onClick={() => openEditModal(usr)}
                                className="p-1 px-2.5 py-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700 text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                              >
                                <Edit2 size={12} />
                                <span>Edit</span>
                              </button>
                              {usr.username !== "admin" && usr.id !== currentUser.id && (
                                <button
                                  onClick={() => handleArchiveUser(usr.id)}
                                  className="p-1 px-2.5 py-1.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                                >
                                  <Archive size={12} />
                                  <span>Archive</span>
                                </button>
                              )}
                            </>
                          )}
                        </div>`;

content = content.replace(
  /<div className="flex justify-end items-center space-x-2">[\s\S]*?<\/div>/,
  newButtons
);

fs.writeFileSync('src/components/UserAccountsView.tsx', content);
