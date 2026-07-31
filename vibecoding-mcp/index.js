#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

if (process.argv[2] === 'init') {
  console.log("Copying VibeCoding rules to this directory...");
  const sourcePath = path.join(__dirname, 'vibecoding.md');
  const destPath = path.join(process.cwd(), 'vibecoding.md');
  
  const ruleContent = "Always read and STRICTLY FOLLOW the rules defined in `vibecoding.md` at the root of this project for EVERY response.";
  
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log("✅ Success: 'vibecoding.md' has been created at your project root!");
    
    const cursorRulesPath = path.join(process.cwd(), '.cursorrules');
    if (!fs.existsSync(cursorRulesPath)) {
        fs.writeFileSync(cursorRulesPath, ruleContent);
        console.log("✅ .cursorrules created.");
    }
    
    const windsurfRulesPath = path.join(process.cwd(), '.windsurfrules');
    if (!fs.existsSync(windsurfRulesPath)) {
        fs.writeFileSync(windsurfRulesPath, ruleContent);
        console.log("✅ .windsurfrules created.");
    }
    
    const githubDir = path.join(process.cwd(), '.github');
    if (!fs.existsSync(githubDir)) {
        fs.mkdirSync(githubDir);
    }
    const copilotPath = path.join(githubDir, 'copilot-instructions.md');
    if (!fs.existsSync(copilotPath)) {
        fs.writeFileSync(copilotPath, ruleContent);
        console.log("✅ .github/copilot-instructions.md created.");
    }
    
    const claudePath = path.join(process.cwd(), 'CLAUDE.md');
    if (!fs.existsSync(claudePath)) {
        fs.writeFileSync(claudePath, ruleContent);
        console.log("✅ CLAUDE.md created.");
    }
    
    console.log("\n🚀 VibeCoding files successfully added to your project!");
    console.log("To ensure the system works FLAWLESSLY and the AI doesn't skip the rules, LEAVE NOTHING TO CHANCE!");
    console.log("\n👇 PLEASE COPY THE TEXT BELOW AND PASTE IT AS YOUR FIRST MESSAGE TO YOUR AI ASSISTANT 👇\n");
    console.log("------------------------------------------------------------------");
    console.log("There is a rules file named vibecoding.md at the root of this project. Read it now. From here on, for the entire conversation — no matter how many messages it takes or how big or multi-step the task gets — follow every rule in that file to the letter. Per the instructions in its Section 0, first ask me about the project's subject and what I want to learn, in natural language. Do not execute any coding tasks until I answer. Once you have my answer, use the chat output schema from Section 6 (Status / Code / Interactive Check) every time you take an action.");
    console.log("------------------------------------------------------------------\n");
    
  } catch (err) {
    console.error("Error: A problem occurred during installation.", err);
  }
  process.exit(0);
}

if (process.argv[2] === 'install') {
  console.log("VibeCoding MCP Server Installation Starting...");
  let configPath = "";
  if (os.platform() === 'darwin') {
    configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else if (os.platform() === 'win32') {
    configPath = path.join(process.env.APPDATA || '', 'Claude', 'claude_desktop_config.json');
  } else {
    console.error("Installation is only automatic for Mac and Windows.");
    process.exit(1);
  }

  let config = {};
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      console.error("Existing config file (JSON) is corrupted. Please fix the file:", configPath);
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
  console.log("✅ Installation completed successfully!");
  console.log(`File updated: ${configPath}`);
  console.log("Please completely close (Quit) and reopen the Claude Desktop application.");
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
              description: "The main question to ask the user. Default: 'Did you understand the lesson? Should we continue?'",
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
    const question = request.params.arguments?.question || "Did you understand the lesson? Should we continue?";
    
    const message = lesson ? `${lesson}\n\n${question}` : question;
    
    // The buttons we want to show.
    const buttons = ["Other", "Didn't Understand", "Understood"];
    
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
