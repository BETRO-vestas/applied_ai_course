---
title: "Lab 1: Memory vs grounded - and the three modes"
minutes: 45
---

**Where:** your work laptop, VS Code + GitHub Copilot.
**Data:** the public NER text only. No company or project files.
**You'll need:** a folder with this repo's `labs-sandbox/m01` contents.
Download the repo as a ZIP from GitHub, or copy the files across.

## Setup (5 min)

1. Open `labs-sandbox/m01` as a folder in VS Code.
2. From the AEMC website, open the **current version of the NER** (public).
   Find clause **S5.2.5.13** (voltage and reactive power control).
3. Paste the clause text into `sources/ner-s5.2.5.13.md`, under the heading
   that records the **NER version number and date**.

## Part A: from memory (5 min)

1. Open Copilot Chat in **Ask** mode. Start a new chat with **no files
   attached**.
2. Ask: *"What does NER clause S5.2.5.13 require for voltage control rise time
   and settling time under the automatic access standard? Be specific."*
3. Paste the answer into `results.md` under **Part A**.

## Part B: grounded (10 min)

1. Start a **new** chat. Attach `sources/ner-s5.2.5.13.md` (use `#file` or
   drag it in).
2. Run the prompt in `.github/prompts/grounded-clause-summary.prompt.md`.
   If your VS Code supports prompt files, type `/grounded-clause-summary`.
   Otherwise copy the prompt text in.
3. Paste the answer under **Part B**.

## Part C: score both (10 min)

In `results.md`, fill in the scoring table. For each specific claim (a number,
a clause reference, a condition), mark it as:

- ✅ **Correct**: matches the source text
- ❌ **Wrong**: contradicts the source text
- ❓ **Unverifiable**: the source doesn't say

## Part D: watch the three modes (10 min)

Give the same task to each mode, in a new chat each time:

> *"Create `checklist.md`: a review checklist for an engineer checking a
> voltage control step-response study against S5.2.5.13, based only on
> `sources/ner-s5.2.5.13.md`. One line per check, each with the sentence it
> comes from."*

1. **Ask** mode: note that it answers in chat and changes no files.
2. **Edit** mode (if available in your version): note that it proposes a file
   change for you to accept.
3. **Agent** mode: note the **steps it takes**, which files it reads, what it
   creates, and **when it asks permission**.

Record what you saw under **Part D**.

## Part E: reflect (5 min)

Answer the three questions at the bottom of `results.md`. Then mark the lab
done in the app and paste your one-line takeaway into the notes.

## If something isn't available

- **No Edit mode:** skip it, because the important comparison is Ask vs Agent.
- **Prompt files not supported:** copy the prompt text in by hand.
- **Can't download the NER at work:** do Parts A–C on any public clause text
  you can reach. The method matters more than the clause.
