const fs = require('fs');
let content = fs.readFileSync('src/components/BackupRestoreView.tsx', 'utf8');

const downloadFunc = `
  async function handleDownloadBackup(id: string, filename: string) {
    try {
      const token = localStorage.getItem("ipfms_token");
      const res = await fetch(\`/api/backups/\${id}/download\`, {
        headers: {
          "Authorization": token || ""
        }
      });
      if (!res.ok) throw new Error("Failed to download");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSuccess("Backup archive downloaded successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to download backup file.");
    }
  }

  async function handleDeleteBackup`;

content = content.replace('  async function handleDeleteBackup', downloadFunc);

fs.writeFileSync('src/components/BackupRestoreView.tsx', content);
