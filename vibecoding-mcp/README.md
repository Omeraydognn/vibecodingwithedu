<h1 align="center">VibeCoding + Learn (v2.2+)</h1>
<p align="center">
  <strong align="center">A universal, zero-config rule system that turns your AI Assistant into a contextual teacher while you vibe code.</strong>
</p>

## The Problem
"Vibe coding" is incredibly fast: you write a prompt, the AI generates the code, you run it, and you move on. But that speed creates the **black-box syndrome**. You pile up dozens of files without ever learning the *why* behind the code. Because you don't need to learn, you stop putting in the effort, and your engineering instincts start to dull over time.

## The Solution
`vibecoding-mcp` is a universal prompt-engineering library. It installs a highly optimized ruleset into your project that forces any AI assistant (Cursor, Windsurf, Claude Code, GitHub Copilot) to **teach you one specific topic** directly tied to the code it just wrote.

No more theoretical fluff. No more long unreadable paragraphs. If the AI writes a piece of code, it must explain exactly how that code relates to the topic you are trying to learn, in 3 sentences or less.

### Key Features
- 🎯 **Single Topic Focus:** You pick exactly one topic you want to master during the project (e.g., "React Hooks", "Postgres Optimization", "Algorithmic Trading"). The AI hyper-focuses all teaching on this topic.
- 🔗 **Contextual Reinforcement:** The AI is strictly forbidden from giving abstract lectures. It must anchor its teaching to the *exact variables or lines of code* it just wrote in that turn.
- 🚫 **Pre-send Check:** The AI runs a self-check before answering. If its lesson doesn't connect to the code, it is forced to revise it or stay silent. No wasted reading time.
- ⚡ **Universal Zero-Config Installer:** Run one command, and it automatically configures `.cursorrules`, `.windsurfrules`, and `.github/copilot-instructions.md`.

---

## 🚀 Quick Install (Universal Method)

Go to your project's root folder in your terminal and run:

```bash
npx -y @relax4400/vibecoding-mcp@latest init
```

**That's it!** The installer will automatically:
1. Copy the `vibecoding.md` ruleset into your project.
2. Generate `.cursorrules` (for Cursor users).
3. Generate `.windsurfrules` (for Windsurf users).
4. Generate `.github/copilot-instructions.md` (for GitHub Copilot).

Next time you open your IDE and start prompting the AI, it will immediately adopt the rules, ask you what topic you want to focus on, and start teaching you contextually. No manual setup required!

## 🧩 Optional: Interactive OS Dialogs (MCP Server)

By default, the AI will print its teaching blocks in the chat. If you want a sleeker experience, you can install the **VibeCoding MCP Server**. This forces the AI to present its questions ("Did you understand this?") via a native OS popup dialog instead of plain text.

### For Cursor / Windsurf Users:
1. Go to **Settings -> Features -> MCP**
2. Click **"+ Add New MCP Server"**
3. **Name:** `VibeCoding`
4. **Type:** `command`
5. **Command:** `npx -y @relax4400/vibecoding-mcp`

### For Claude Desktop Users:
Run this command in your terminal and restart Claude:
```bash
npx -y @relax4400/vibecoding-mcp install
```
*(This automatically updates your `claude_desktop_config.json`)*

---

## How It Works

Once installed, your AI will structure every response that involves an action (writing code, debugging, analyzing logs) exactly like this:

1. **Status:** A 1-2 sentence summary of what changed.
2. **Code:** Clean code block with no inline comments.
3. **Interactive Check:** A highly-focused, 3-sentence micro-lesson tied directly to the code, followed by a multiple-choice question to confirm your understanding.

**Example AI Output:**
> ### Status
> Extracted the database connection into a singleton pattern.
> 
> ### Code
> ```typescript
> // code here
> ```
> 
> ### Interactive Check
> **Lesson:** Notice how we moved the `new PrismaClient()` outside the request handler (line 12). Since your learning focus is **Serverless Optimization**, this is crucial because it prevents AWS Lambda from opening a new database connection on every single user request, avoiding connection pool exhaustion.
> 
> Did you understand this?
> 1. Yes, move on.
> 2. No, explain it deeper.
> 3. Other

---

## License
MIT
