---
title: "What an agent is: instructions + knowledge + starters"
minutes: 8
---

### From chat to agent

| Level | What you do | Example |
|---|---|---|
| **Chat** | Write a prompt each time | "List Coral Ridge commitments…" |
| **Saved prompt** | Reuse a tested prompt | The commitment-finder template |
| **Notebook** | Reuse a curated source set | Coral Ridge project memory |
| **Agent** | Reuse **instructions and knowledge together**, shared with others | "Project Memory" agent for all Grid Leads |

An agent built in **Agent Builder** (inside Microsoft 365 Copilot) is a
*declarative agent*. That means it's defined by what you declare:

- **Name and description:** what it's for.
- **Instructions:** how it behaves (the most important part).
- **Knowledge:** which sources it grounds on.
- **Starter prompts:** suggested questions that show users what to ask.
- **Capabilities** (optional): for example code interpreter or image generation.

No code, no deployment pipeline. You describe it, configure it, test it and
share it.

### Knowledge limits worth knowing

*(Checked November 2026. Limits change, so check Microsoft Learn's "Add knowledge
sources to an agent in Agent Builder".)*

| Knowledge source | Limit per agent |
|---|---|
| SharePoint files, folders or sites | 100 files |
| SharePoint lists | 1 list |
| OneDrive files | 50 files |
| Teams chats and meetings | 5 chats and 5 meetings |
| Files uploaded from your device | 20 files |
| Public websites | 4 URLs |

### Licences 🔒

- **Premium:** build and use agents grounded on work data. Included.
- **Copilot Chat:** build agents grounded on **public web** content. Using agents
  grounded on **work data** (for example SharePoint) is **pay-as-you-go**, and only
  if your organisation has enabled it.
- **Sharing:** when you share a work-data agent with Chat-only colleagues, their
  use may be billed to your organisation. **Until everyone has Premium, share
  work-data agents with Premium users only**, unless your organisation says
  otherwise.

### SharePoint agents are moving into Agent Builder

You can start an agent from a SharePoint library or selected files, and the
selection becomes its initial knowledge. From late 2026, Microsoft is moving
these into the same Agent Builder experience. Older `.agent` files are being
retired during 2027.

### What would you do?

**Which repeated question in your team deserves an agent, rather than a saved
prompt or a notebook?**
