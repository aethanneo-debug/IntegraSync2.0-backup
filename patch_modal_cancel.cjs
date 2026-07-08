const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-2">
              {!user?.requirePasswordChange && (
                <button 
                  type="button"
                  onClick={() => {
                    setShowPasswordChangeModal(false);
                    setCurrentPasswordInput("");
                    setNewPasswordInput("");
                    setConfirmPasswordInput("");
                    setPasswordChangeError("");
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-all"
                >
                  Cancel
                </button>
              )}
              <button 
                type="button"`;

content = content.replace(
  '<div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">\n              <button \n                type="button"',
  replacement
);

fs.writeFileSync('src/App.tsx', content);
