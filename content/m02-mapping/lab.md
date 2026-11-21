---
title: "Lab 2: Where does the time go?"
minutes: 60
---

**Where:** your work laptop, VS Code + GitHub Copilot, Python (most power
system engineers already have it).
**Data:** fictional files in `labs-sandbox/m02/data/`, covering four weeks of
timesheets for a six-person team, eight projects and about 400 review comments.
**Goal:** a ranked opportunity list you could defend to your manager.

## Setup (5 min)

1. Open `labs-sandbox/m02` in VS Code.
2. Skim `data/timesheet.csv`, `data/projects.csv` and
   `data/review_comments.csv`. Don't analyse yet.

## Part A: let Copilot read the data (5 min)

In **Ask** mode, attach the three CSVs and ask:

> *"Describe the structure of these three files: columns, what each row
> means and how they join. Don't calculate any totals."*

Check its description against the files.

## Part B: totals from memory vs from code (15 min)

1. Still in Ask mode, ask: *"What percentage of power system engineer hours is
   POSTPROC-PLOTS?"* Write its answer in `results.md`.
2. Switch to **Agent** mode and run the prompt in
   `.github/prompts/analyse-time.prompt.md`. It asks Copilot to write
   `analyse.py`, run it, and produce `summary.md`.
3. **Check the script** rather than the numbers. Read `analyse.py`: does it
   filter by role correctly? Does it sum hours, or count rows?
4. Compare the script's figure with the chat's figure from step 1.

## Part C: failure demand (10 min)

Ask Agent mode to extend `analyse.py`:

> *"From review_comments.csv, show comments and hours-to-close by category,
> and the share of comments marked repeat_of_earlier. Add a section to
> summary.md."*

Then decide for yourself, without AI, **which categories are failure
demand**. Record your list and the share it represents in `results.md`.

## Part D: score the opportunities (20 min)

1. Open `scoring-rubric.md` (the six factors from lesson 4) and
   `opportunities.csv` (a starter list of 10 tasks).
2. In Agent mode:
   > *"Using scoring-rubric.md and the figures in summary.md, fill in a
   > first-pass score (1–5) for each factor in opportunities.csv, with a short
   > reason in the reason column. Don't calculate the priority."*
3. **Review every score.** Change at least the consequence and data access
   scores where your judgement differs. Copilot can't know your
   organisation's risk appetite.
4. Ask Copilot to add a priority column to `analyse.py` using the formula in
   the rubric, and print the ranked list.

## Part E: reflect (5 min)

Answer the questions at the bottom of `results.md`. Mark the lab done in the
app and note your top three.

## If something isn't available

- **No Python:** ask Copilot to write Excel formulas or a pivot-table recipe
  instead. The lesson is the same: calculations live somewhere checkable.
- **Agent mode can't run commands:** let it write the script, then run
  `python analyse.py` in the terminal yourself.
