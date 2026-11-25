---
title: "Lab 4: Traceability and precedent"
minutes: 60
---

- **Where:** your work laptop, VS Code + GitHub Copilot. No Python needed.
- **Data:** a fictional document set in the lab files (`lab-m04/docs`): a GPS
  excerpt, two revisions of a study report, TNSP report requirements, a comment
  library from past projects, and three new round 2 comments.
- **Goal:** a compliance matrix that would survive review, and draft
  responses that use precedent without leaking other customers' information.

## Setup (5 min)

1. Unzip the lab files and open the `lab-m04` folder in VS Code.
2. Read `.github/copilot-instructions.md`, the team rules for this kind of
   work. Notice the rules on revisions, statuses and precedent.
3. Skim the files in `docs/`. Don't look for answers yet.

## Part A: extract the requirements (10 min)

In **Ask** mode, attach the GPS excerpt and ask Copilot to list every GPS
requirement with its ID, NER reference and an **exact quote**. Check three of
the quotes word for word against the file.

## Part B: build the compliance matrix (15 min)

1. In **Agent** mode, run `.github/prompts/build-matrix.prompt.md`. It
   fills `compliance-matrix.csv`.
2. Check every **Evidenced** row: open the cited section and confirm that the
   quote is there and demonstrates the requirement.
3. Pay particular attention to GPS-5 and GPS-9. Are their statuses right?
   What does the superseded report say about them?

## Part C: check against the TNSP's requirements (5 min)

Ask Copilot which of TNSP-A's report requirements (TR-1 to TR-4) the current
study report might not meet, with quotes. Decide for yourself.

## Part D: precedent and draft responses (15 min)

1. Run `.github/prompts/find-precedent.prompt.md`.
2. For each draft response, check:
   - Is the precedent relevant?
   - Did it correctly decide whether the issue is a real gap?
   - **Does any draft mention another project, developer or their data?** If
     so, the instructions failed. Fix the draft, then strengthen the
     instruction.

## Part E (optional): the same through SharePoint or Confluence

Only if your organisation allows the tool, and **only with these fictional
files**:

1. Upload `docs/` to a personal or sandbox SharePoint folder or Confluence
   space you control.
2. In Agent mode, enable the SharePoint or Confluence tool and repeat Part B,
   asking Copilot to *search* for the documents rather than attaching them.
3. Compare: did search find both report revisions? Did it notice the status
   line? Did citations still name file and section?

## Reflect (5 min)

Answer the questions in `results.md`, mark the lab done, and note which team
rule did the most work.

---

## Answer key

Try the lab first.

| GPS | Expected status | Why |
|---|---|---|
| GPS-1 | Evidenced | Rev C §3 |
| GPS-2 | Evidenced | Rev C §4 (FRT-01–14 incl. Attachment B sequence; Iq 28–34 ms) |
| GPS-3 | Evidenced | Rev C §4 (P recovery 48–62 ms) |
| GPS-4 | Evidenced | Rev C §5, but TR-3 not met: the definitions of rise and settling time aren't stated |
| GPS-5 | **Gap** | Only Rev B §7 covers it, and Rev B is superseded (old model). Rev C Appendix A lists it as an open item. Rev C §2's blanket claim of compliance isn't evidence |
| GPS-6 | Evidenced | Rev C §6 |
| GPS-7 | Evidenced | Rev C §8 |
| GPS-8 | Evidenced | Rev C §9 |
| GPS-9 | **Partial** | Rev C §10 covers overvoltage only; undervoltage cases are missing |

**TNSP requirements:** TR-3 isn't met (definitions not stated). TR-4 is only
partly met (model version stated once at the top, not with every result).
TR-2 can't be confirmed from the text, so you'd need to check the figures.

**Precedent:**
- **N01** (mode switching): precedent L01 fits. It's a real gap (GPS-5). The
  approach is to add mode-transition study cases with model v4.2. **Trap:** L01's
  resolution mentions another developer and their site test record; the draft must not.
- **N02** (settling time definition): precedent L02 fits. Fix: state the
  definitions in the method section (also fixes TR-3).
- **N03** (undervoltage cases): precedent L06 fits. It's a real Partial (GPS-9). Add the
  undervoltage cases.

**Lessons that should become template changes:** L01 (default mode-switching
section), L02 (state definitions), L03 (plotting template), L04 (model
version in every section).
