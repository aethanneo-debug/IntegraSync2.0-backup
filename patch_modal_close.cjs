const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="text-yellow-400 shrink-0" size={20} />
                <div>
                  <h3 className="font-bold text-sm tracking-wide">{user?.requirePasswordChange ? "FIRST-TIME PASSWORD CHANGE" : "CHANGE PASSWORD"}</h3>
                  <p className="text-[10px] text-slate-300">{user?.requirePasswordChange ? "Administrative security protocol requires a new credential password." : "Update your credential password."}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => {
                  if (user?.requirePasswordChange) {
                    handleSignOut();
                  } else {
                    setShowPasswordChangeModal(false);
                    setCurrentPasswordInput("");
                    setNewPasswordInput("");
                    setConfirmPasswordInput("");
                    setPasswordChangeError("");
                  }
                }} 
                className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                title={user?.requirePasswordChange ? "Sign Out" : "Close"}
              >
                <X size={18} />
              </button>
            </div>`;

content = content.replace(
  '<div className="bg-slate-900 text-white p-5 flex items-center space-x-3">\n              <Lock className="text-yellow-400 shrink-0" size={20} />\n              <div>\n                <h3 className="font-bold text-sm tracking-wide">FIRST-TIME PASSWORD CHANGE</h3>\n                <p className="text-[10px] text-slate-300">Administrative security protocol requires a new credential password.</p>\n              </div>\n            </div>',
  replacement
);

fs.writeFileSync('src/App.tsx', content);
