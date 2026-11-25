---
title: "Context: give it the clause, don't ask it to remember"
minutes: 10
---

## The context window

Everything a model can "see" when it answers is called its **context**. This
includes your question, the conversation so far, any files or text you attach,
and any instructions set up in the background. The space for all of that is the
**context window**.

Modern context windows are large, room for hundreds of pages of text. But two
practical limits remain:

1. **Only what's in the window counts.** If the current version of S5.2.5.13 is
   not in the context, the model falls back on memory.
2. **More isn't always better.** Burying the key paragraph in 400 pages of
   attachments makes it easier for the model to miss or mix things up.
   Focused, relevant context beats a dump of everything.

## Grounding

**Grounding** means making the model answer *from material you supply* rather
than from memory. It is the single most effective habit for engineering use.

Compare two prompts:

> **Ungrounded:** "Summarise the NER requirements for voltage control
> settling time."

> **Grounded:** "Using only the attached text of NER S5.2.5.13 (version
> number noted at the top of the file), list each requirement relating to
> settling time. Quote the sentence each one comes from. If the text doesn't
> say, write 'not stated'."

The grounded prompt does four things:

- **Supplies the source.** The model reads the text instead of recalling it.
- **Restricts it to that source** ("using only").
- **Asks for evidence** (a quote per claim), which makes checking fast.
- **Allows "not stated"**, so the model doesn't have to fill a gap by inventing
  something.

## Context in GitHub Copilot

In VS Code, Copilot Chat builds its context from:

- **Your prompt** and the chat history.
- **Files you reference**, for example `#file` or by attaching them. You choose
  what it reads.
- **The workspace**, such as open editors and, when asked, a search of the
  project.
- **Custom instructions**: a file in the repository
  (`.github/copilot-instructions.md`) that is quietly added to every request.
  Think of it as a team standing brief. Module 3 builds one.
- **Tools.** In agent mode, Copilot can read files, run commands and use
  approved MCP tools (for you, Microsoft 365 / SharePoint and Atlassian) to
  *fetch* context itself.

## Retrieval: grounding at scale

When the material is too large to attach by hand (every past project's comment
register, the full set of AEMO guidelines), systems use **retrieval**. They
search a document store for the most relevant passages and put only those in
the context. You'll see this called **RAG** (retrieval-augmented generation).
Module 4 covers it properly. For now, know that it is grounding, automated, and
only as good as the documents behind it.

## A useful mental model

Treat the model like a **very fast, very well-read contractor on their first
day**. They are capable, but they don't know your project, your GPS or which
version of the guideline applies. You wouldn't ask a new contractor to quote
the GPS from memory. You'd hand them the agreement.

## What would you do?

Aisha wants to use Copilot to draft first-pass responses to the 46 open round 2
comments on Larkspur Downs.

**What context would you insist the assistant is given for each response, and
what would you deliberately keep *out* of the context?**
