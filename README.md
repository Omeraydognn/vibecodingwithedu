# VibeCoding + Learn

**A universal, single-file rule system, independent of any IDE, that helps you actually learn
something while an AI writes your code.**

---

## The Problem

"Vibe coding" is fast: you write a prompt, the AI generates the code, you run it and move on.
But that speed comes at a cost — the **black-box syndrome**. You pile up dozens of files without
ever learning what was written, why that library/pattern was chosen, or what the logic of the
domain you're working in (quantum, blockchain, finance, whatever it is) actually looks like.
Because you don't need to learn, you stop putting in the effort — and your instincts start to
dull over time.

## The Solution

`vibecoding.md` is a rules file you place at the root of your project, one that any AI assistant
(Claude Code, Cursor, Windsurf, Copilot Chat, whichever you use) reads and follows. An AI that
reads this file keeps writing code, but **feeds you a micro-dose of knowledge on two fronts in
every response**:

- 🧠 **Domain knowledge** — the logic of the field you're working in (physics, business rule,
  protocol, whatever it is)
- 💻 **Software/architecture knowledge** — why that language/library/pattern was chosen, which
  engineering principle was applied

There's no extra step beyond setup. You don't type terminal commands, you don't re-upload the
file. You keep having a normal conversation, and the learning happens on its own.

## How it works (summary)

| Mechanism | What it does |
|---|---|
| **Dual Hat** | The AI acts as both a Domain Expert and a Senior Engineer in every response. |
| **Phase Detection** | Teaches the big picture while the project is small, deeper detail as it grows — never floods you with information. |
| **Micro-Dose Rule** | Exactly 1 domain + 1 software concept per response, max 3 sentences each. |
| **Tech Concept Test** | A tech lesson is never a code summary — it's always a named, transferable engineering principle (e.g. *Data Leakage Prevention*, *Idempotency*). |
| **Analogy / Scaffolding** | Every new concept is tied to a real-world analogy or something already learned in the project. |
| **Learning History** | The AI logs what it has taught in `vibecoding-log.md` and never explains the same thing twice. |
| **Personal Focus** | Asks upfront "domain, software, balanced, or a specific topic?" and weights its teaching accordingly. |
| **Fixed Chat Format** | Every response follows `Status → Code → Micro-Lesson → Next Hook` — no comment lines in the code, everything stays in the chat. |

For the full rules and rationale: [`vibecoding.md`](vibecoding.md).

## Example output

```
### Status
Added a 2-qubit Bell state circuit.

### Code
<code block>

### Micro-Lesson
**Domain:** A Hadamard gate puts a qubit into superposition — like a coin being both heads and
tails while it's still in the air. A CNOT gate entangles the two qubits, so measuring one
instantly determines the other.

**Tech — Idempotency:** Running an operation more than once should produce the same result as
running it once — like a retried payment request not charging the card twice. Here, the circuit
setup function rebuilds the state from scratch every time it's called, so calling it again is
safe (circuit.py:12).

### Next Hook
If we added a third qubit to this circuit, how would the entanglement change?
```

---

## Setup

### 1) Copy the file to your project's root

Place [`vibecoding.md`](vibecoding.md) at your project's root, under its own name. **You don't
need to rename it** — the method below works no matter which AI tool you use.

### 2) Start a new chat and paste the kickoff prompt (the guaranteed method)

Some tools (Claude Code → `CLAUDE.md`, Cursor → `.cursorrules`, etc.) automatically read certain
file names, but that convention doesn't hold across every tool and isn't guaranteed. The one
method that works no matter the AI/tool: paste this as **the first message of every new chat**.

```
There is a rules file named vibecoding.md at the root of this project. Read it now.
From here on, for the entire conversation — no matter how many messages it takes or how big
or multi-step the task gets — follow every rule in that file to the letter. Per the
instructions in its Section 0, first ask me about the project's subject and what I want to
learn, in natural language, without showing me field names or the file's internal structure.
Once you have my answer, use the chat output schema from Section 6 (Status / Code /
Micro-Lesson / Next Hook) every time you write code.
```

This works even if the tool doesn't recognize the file name, because "read a file + follow its
instructions" is a baseline capability of every AI. Once you've answered the domain questions,
start prompting for code as usual.

### (Optional) Rename the file for automatic loading

Using the tool's own rules-file naming convention saves you from pasting the kickoff prompt
every time:

| Tool | File name |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules` (or `.cursorrules`) |
| Windsurf | `.windsurfrules` |
| GitHub Copilot Chat | `.github/copilot-instructions.md` |

If you use one of these names, the tool reads the file on its own at the start of the chat and
you won't need the kickoff prompt — but if you added the file while a chat was already open, you
still need to **start a new session**; it won't apply to the existing one.

## After setup

- To avoid teaching the same concept twice, the AI will create and maintain a ledger file named
  `vibecoding-log.md` at the project root — don't delete it, it's the system's memory.
- You can change what you want to learn at any time by saying **"switch focus to X"** in chat
  (e.g. "switch focus to gas optimization").
- If you say "stop teaching," the AI will ignore this file and go back to behaving like a normal
  assistant.

## Limitations

- The rules act like a system prompt, but they're not a guarantee — on very large/multi-step
  autonomous tasks (e.g. a task that changes dozens of files and commits in one go), the format
  can occasionally weaken. It's most reliable on small, single-step prompts.
