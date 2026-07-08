const fs = require('fs');
let content = fs.readFileSync('src/components/BackupRestoreView.tsx', 'utf8');

const restoreBtn = `<button
                          onClick={() => setConfirmRestore(backup.id)}`;

const downloadBtn = `<button
                          onClick={() => handleDownloadBackup(backup.id, backup.filename)}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 rounded text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Download size={12} />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => setConfirmRestore(backup.id)}`;

content = content.replace(restoreBtn, downloadBtn);

fs.writeFileSync('src/components/BackupRestoreView.tsx', content);
