#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

if (process.argv[2] === 'init') {
  console.log("VibeCoding kuralları bu klasöre kopyalanıyor...");
  const sourcePath = path.join(__dirname, 'vibecoding.md');
  const destPath = path.join(process.cwd(), 'vibecoding.md');
  
  const ruleContent = "Always read and STRICTLY FOLLOW the rules defined in `vibecoding.md` at the root of this project for EVERY response.";
  
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log("✅ Başarılı: 'vibecoding.md' dosyası projenizin ana dizinine oluşturuldu!");
    
    const cursorRulesPath = path.join(process.cwd(), '.cursorrules');
    if (!fs.existsSync(cursorRulesPath)) {
        fs.writeFileSync(cursorRulesPath, ruleContent);
        console.log("✅ .cursorrules oluşturuldu.");
    }
    
    const windsurfRulesPath = path.join(process.cwd(), '.windsurfrules');
    if (!fs.existsSync(windsurfRulesPath)) {
        fs.writeFileSync(windsurfRulesPath, ruleContent);
        console.log("✅ .windsurfrules oluşturuldu.");
    }
    
    const githubDir = path.join(process.cwd(), '.github');
    if (!fs.existsSync(githubDir)) {
        fs.mkdirSync(githubDir);
    }
    const copilotPath = path.join(githubDir, 'copilot-instructions.md');
    if (!fs.existsSync(copilotPath)) {
        fs.writeFileSync(copilotPath, ruleContent);
        console.log("✅ .github/copilot-instructions.md oluşturuldu.");
    }
    
    console.log("\n🚀 VibeCoding tüm AI editörleri (Cursor, Windsurf, Copilot vb.) için otomatik olarak ayarlandı!");
    console.log("Artık AI'a sadece ne yapmak istediğini söylemen yeterli. Kurallar otomatik uygulanacak.");
  } catch (err) {
    console.error("Hata: Kurulum sırasında bir sorun oluştu.", err);
  }
  process.exit(0);
}

if (process.argv[2] === 'install') {
  console.log("VibeCoding MCP Server Kurulumu Başlıyor...");
  let configPath = "";
  if (os.platform() === 'darwin') {
    configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else if (os.platform() === 'win32') {
    configPath = path.join(process.env.APPDATA || '', 'Claude', 'claude_desktop_config.json');
  } else {
    console.error("Kurulum sadece Mac ve Windows için otomatiktir.");
    process.exit(1);
  }

  let config = {};
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      console.error("Mevcut config dosyası (JSON) bozuk. Lütfen dosyayı düzeltin:", configPath);
      process.exit(1);
    }
  }

  if (!config.mcpServers) config.mcpServers = {};

  config.mcpServers.vibecoding = {
    command: "npx",
    args: ["-y", "@relax4400/vibecoding-mcp"]
  };

  const dir = path.dirname(configPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  console.log("✅ Kurulum başarıyla tamamlandı!");
  console.log(`Dosya güncellendi: ${configPath}`);
  console.log("Lütfen Claude Desktop uygulamasını tamamen kapatıp (Quit) yeniden açın.");
  process.exit(0);
}

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const { showDialog } = require('./ui.js');

const server = new Server(
  {
    name: "vibecoding-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "ask_interactive_check",
        description: "Pops up a native OS dialog to the user to confirm their understanding of the lesson just taught. MUST be called at the end of every code generation response.",
        inputSchema: {
          type: "object",
          properties: {
            lesson: {
              type: "string",
              description: "The Micro-Lesson text to display inside the popup. Leave empty if no lesson.",
            },
            question: {
              type: "string",
              description: "The main question to ask the user. Default: 'Dersi anladın mı? Devam edelim mi?'",
            },
          },
          required: [],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "ask_interactive_check") {
    const lesson = request.params.arguments?.lesson || "";
    const question = request.params.arguments?.question || "Dersi anladın mı? Devam edelim mi? (Do you want to continue?)";
    
    const message = lesson ? `${lesson}\n\n${question}` : question;
    
    // The buttons we want to show.
    const buttons = ["Diğer", "Anlamadım", "Anladım"];
    
    try {
      const response = await showDialog(message, buttons);
      return {
        content: [
          {
            type: "text",
            text: `User clicked: ${response}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error showing dialog: ${error}`,
          },
        ],
      };
    }
  }

  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
