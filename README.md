<h1 align="center">VibeCoding + Learn (v2.4+)</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@relax4400/vibecoding-mcp">
    <img src="https://img.shields.io/npm/v/@relax4400/vibecoding-mcp.svg?logo=npm&logoColor=fff&label=NPM+Package&color=cb3837" alt="NPM Package">
  </a>
</p>
<p align="center">
  <strong align="center">A universal, zero-config rule system that turns your AI Assistant into a contextual teacher while you vibe code.</strong>
</p>

## The Problem
"Vibe coding" is incredibly fast: you write a prompt, the AI generates the code, you run it, and you move on. But that speed creates the **black-box syndrome**. You pile up dozens of files without ever learning the *why* behind the code. Because you don't need to learn, you stop putting in the effort, and your engineering instincts start to dull over time.

## The Solution
`vibecoding-mcp` installs a highly optimized ruleset into your project that forces any AI assistant (Cursor, Windsurf, Claude Code, GitHub Copilot) to **teach you one specific topic** directly tied to the code it just wrote.

No more theoretical fluff. If the AI writes a piece of code, it must explain exactly how that code relates to the topic you are trying to learn, in 3 sentences or less.

### Key Features
- 🎯 **Single Topic Focus:** You pick exactly one topic you want to master during the project (e.g., "React Hooks", "Postgres Optimization", "Algorithmic Trading"). The AI hyper-focuses all teaching on this topic.
- 🔗 **Contextual Reinforcement:** The AI is strictly forbidden from giving abstract lectures. It must anchor its teaching to the *exact variables or lines of code* it just wrote in that turn.
- 🚫 **Pre-send Check & Anti-Hijacking:** The AI is forced to act as a *passive background teacher*. It will never generate fake code just to teach a lesson, and it runs a self-check to ensure its lesson perfectly matches your project task.

---

## 🚀 Setup & Installation (CRITICAL)

To ensure this system works flawlessly across **all AI tools** (which often have strict safety filters that block them from reading files silently), you must follow this two-step process to guarantee success.

### Step 1: Install the Rules

Go to your project's root folder in your computer's terminal and run:

```bash
npx -y @relax4400/vibecoding-mcp@latest init
```

> **Note:** If your AI assistant refuses to run this terminal command for you, simply open your Mac/Windows terminal yourself, navigate to your project folder (`cd path/to/project`), and run the command manually.

This command will automatically generate `vibecoding.md` and the necessary hidden config files (`.cursorrules`, `CLAUDE.md`, etc.) in your folder.

### Step 2: The Kickoff Prompt (Mandatory)

Even with the files installed, modern AI agents have "Prompt Injection Protections" that prevent them from blindly following rules found in random files unless you explicitly command them to. 

To leave nothing to chance, **start a new chat** and paste the following text as your very first message:

> There is a rules file named vibecoding.md at the root of this project. Read it now. From here on, for the entire conversation — no matter how many messages it takes or how big or multi-step the task gets — follow every rule in that file to the letter. Per the instructions in its Section 0, first ask me about the project's subject and what I want to learn, in natural language. Do not execute any coding tasks until I answer. Once you have my answer, use the chat output schema from Section 6 (Status / Code / Interactive Check) every time you take an action.

**The AI will immediately pause, refuse to write any code, and ask you what you want to learn.** Once you answer, you can continue coding normally, and the AI will attach micro-lessons to every task you give it!

---

## 🧩 Optional: Interactive OS Dialogs (MCP Server)

By default, the AI will print its teaching blocks directly in the chat window. If you want a sleeker experience, you can install the **VibeCoding MCP Server**. This forces the AI to present its questions via a native OS popup dialog instead of plain text.

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

---

## How It Works

Once installed and activated with the Kickoff Prompt, your AI will structure every response that involves an action (writing code, debugging, analyzing logs) exactly like this:

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
