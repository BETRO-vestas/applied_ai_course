---
title: From chat to agents
minutes: 10
---

## Three levels

| Level | What the AI does | Example in your world |
|---|---|---|
| **Chat** | Answers in text; you copy and paste | "Explain what a DMAT checks." |
| **Workflow** | Runs fixed steps that **you** designed; the AI fills in steps | Each comment → classify → find related clause → draft response → human review |
| **Agent** | Given a goal and tools, it **decides its own steps**, acts, checks results and repeats | "Update the plotting script so all figures match the new report template, then run it and fix any errors." |

The defining feature of an **agent** is the **loop**:

```
goal → plan → use a tool → look at the result → decide the next step → … → done
```

**Tools** are what make it an agent rather than a chatbot. A tool might read a
file, run a Python script, search SharePoint, or create a Jira issue. Each
tool use is an *action* that has an effect.

## Workflows vs agents: the key design choice

| | Workflow | Agent |
|---|---|---|
| Predictability | High: same steps every time | Lower: it picks the path |
| Auditability | Easy: every step is known | Needs logs and review |
| Good when | The process is well understood and repeated | The path varies or needs judgement |
| Grid example | Comment register processing | Debugging a broken study script |

For a regulated, audited process, **start with workflows**. Use agents where
the path genuinely varies and the result is easy to check, such as code.
Many good systems are mostly workflow with a small agent step inside.

## MCP: how tools are plugged in

**MCP (Model Context Protocol)** is an open standard for connecting AI
assistants to tools and data sources. An MCP server exposes things like "search
documents" or "create issue", and any compatible assistant can use them.

Your company allows a small number of MCP tools in Copilot, including
Microsoft 365 / SharePoint and Atlassian (Jira / Confluence). That means an
agent could, with your approval, *find* the TNSP's latest comment letter in
SharePoint or *create* the Jira tasks for a review round. Module 4 and module 5
use this.

## Copilot's modes

In VS Code Copilot Chat you'll see modes such as:

- **Ask:** chat about your code or files. It doesn't change anything.
- **Edit:** proposes edits to files you choose; you accept or reject them.
- **Agent:** works through a multi-step task. It can read files, create and
  edit them, run terminal commands and call tools, and asks permission for
  actions with side effects.

The exact names and options change between versions, but the levels map
directly to the table above. The lab this week has you watch each mode work
on the same task.

## What would you do?

For Larkspur Downs, list three tasks you'd give **chat**, three you'd build as
a **workflow**, and one you'd let an **agent** try.

**For the agent task, what tools would it need, and which actions must it ask
permission for?**
