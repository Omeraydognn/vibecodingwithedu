const { execFile, exec } = require('child_process');
const os = require('os');

function showDialog(message, buttons) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    if (platform === 'darwin') {
      const btnString = buttons.map(b => `"${b}"`).join(', ');
      const defaultBtn = buttons[buttons.length - 1];
      
      const escapedMessage = message.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      
      const appleScript = `
        try
          button returned of (display dialog "${escapedMessage}" with title "VibeCoding Interactive Check" buttons {${btnString}} default button "${defaultBtn}")
        on error number -128
          return "Canceled"
        end try
      `;
      
      execFile('osascript', ['-e', appleScript], (err, stdout, stderr) => {
        if (err) {
          resolve("Error: " + err.message);
          return;
        }
        resolve(stdout.trim());
      });
    } else if (platform === 'win32') {
      const escapedMessage = message.replace(/'/g, "''");
      const psScript = `Add-Type -AssemblyName PresentationFramework; $res = [System.Windows.MessageBox]::Show('${escapedMessage}', 'VibeCoding Interactive Check', 'YesNoCancel', 'Question'); Write-Output $res`;
      
      execFile('powershell', ['-NoProfile', '-Command', psScript], (err, stdout) => {
        if (err) {
            resolve("Error: " + err.message);
            return;
        }
        const res = stdout.trim();
        if (res === 'Yes') resolve(buttons[2]); 
        else if (res === 'No') resolve(buttons[1]); 
        else resolve(buttons[0]); 
      });
    } else {
      const escapedMessage = message.replace(/"/g, '\\"');
      const script = `zenity --question --title="VibeCoding Interactive Check" --text="${escapedMessage}" --ok-label="${buttons[2]}" --cancel-label="${buttons[1]}"`;
      exec(script, (err) => {
        if (err) resolve(buttons[1]); 
        else resolve(buttons[2]);
      });
    }
  });
}

module.exports = { showDialog };
