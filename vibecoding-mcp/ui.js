const { exec } = require('child_process');
const os = require('os');

function showDialog(message, buttons) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    if (platform === 'darwin') {
      // Mac - AppleScript allows max 3 buttons
      const btnString = buttons.map(b => `"${b}"`).join(', ');
      const defaultBtn = buttons[buttons.length - 1]; // rightmost button
      
      const script = `osascript -e 'try' -e 'button returned of (display dialog "${message}" with title "VibeCoding Interactive Check" buttons {${btnString}} default button "${defaultBtn}")' -e 'on error number -128' -e 'return "Canceled"' -e 'end try'`;
      
      exec(script, (err, stdout, stderr) => {
        if (err) {
          resolve("Error: " + err.message);
          return;
        }
        resolve(stdout.trim());
      });
    } else if (platform === 'win32') {
      // Windows - PowerShell MessageBox (Yes=Anladım, No=Anlamadım, Cancel=Diğer)
      const script = `powershell -Command "Add-Type -AssemblyName PresentationFramework; $res = [System.Windows.MessageBox]::Show('${message}', 'VibeCoding Interactive Check', 'YesNoCancel', 'Question'); Write-Output $res"`;
      exec(script, (err, stdout) => {
        if (err) {
            resolve("Error: " + err.message);
            return;
        }
        const res = stdout.trim();
        if (res === 'Yes') resolve(buttons[2]); // Anladım
        else if (res === 'No') resolve(buttons[1]); // Anlamadım
        else resolve(buttons[0]); // Diğer
      });
    } else {
      // Linux - Zenity
      const script = `zenity --question --title="VibeCoding Interactive Check" --text="${message}" --ok-label="${buttons[2]}" --cancel-label="${buttons[1]}"`;
      exec(script, (err) => {
        if (err) {
           resolve(buttons[1]); // cancel returns error code
        } else {
           resolve(buttons[2]);
        }
      });
    }
  });
}

module.exports = { showDialog };
