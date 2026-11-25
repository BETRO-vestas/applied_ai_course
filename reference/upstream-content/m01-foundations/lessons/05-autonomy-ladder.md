---
title: The autonomy ladder for a grid team
minutes: 12
---

## A ladder, not a switch

"Should we use AI agents?" is the wrong question. The useful question is
**how much autonomy, for which task, with which checks?**

| Rung | Name | AI role | Human role | Example |
|---|---|---|---|---|
| 0 | **None** | — | Does the work | Signing off the GPS compliance report |
| 1 | **Assist** | Explains, answers questions | Does the work | "What does this AEMO comment mean?" |
| 2 | **Draft** | Produces a first version | Reviews and edits everything | First-pass comment responses |
| 3 | **Do, then review** | Completes a bounded task | Checks the result before it is used | Generating study plots and summary tables |
| 4 | **Do, review samples** | Runs a repeated task | Spot-checks and handles exceptions | Formatting and filing study outputs |
| 5 | **Autonomous** | Acts without review | Monitors outcomes | Rarely appropriate for regulatory work |

## Placing a task on the ladder

Four questions decide the right rung:

1. **Consequence of an error.** Would a mistake reach AEMO or the TNSP, change
   a GPS, or delay energisation? → Lower rung.
2. **Ease of checking.** Can a person verify the result faster than doing the
   work? (A plot against source data: yes. A subtle argument in a negotiation
   letter: harder.) → Easy checking allows a higher rung.
3. **Repetition.** Done every week on every project? → Worth investing to move
   it up the ladder.
4. **Data sensitivity.** Does it touch confidential TNSP network models or
   commercial terms? → Only sanctioned tools, and a lower rung.

## Where the team's time probably goes

From the Larkspur Downs snapshot:

- Tom: **4 days per study re-run**, mostly setup, export, plotting and
  formatting. That is repeated, easy to check and low consequence if reviewed,
  so a **rung 3 candidate**.
- Aisha: **1 day a week** consolidating comment status. That is repeated and
  structured, so a **workflow at rung 2–3**.
- Repeat comments (9 of 46): finding how similar comments were answered
  before is a **knowledge retrieval problem** (module 4), a rung 1–2 aid.
- GPS negotiation positions: high consequence and judgement-heavy, so
  **rung 1 at most** (AI helps you prepare, you decide).

## The leader's job

As Head of Grid, your job isn't to pick tools. It is to:

1. Decide **which rung each task type is allowed** to sit on.
2. Make the **checks at each rung explicit** and cheap.
3. Move tasks **up one rung at a time**, with evidence (an eval or a measured
   pilot) before each step up.
4. Keep **accountability** visible at every rung.

That is the start of your efficiency strategy. Module 2 maps the full work
inventory. Module 8 turns it into a roadmap.

## What would you do?

**Pick the first pilot task for your team.** Say which rung it starts on,
what the check is, and what evidence would justify moving it up a rung after
six weeks.

This becomes your module 1 decision memo.
