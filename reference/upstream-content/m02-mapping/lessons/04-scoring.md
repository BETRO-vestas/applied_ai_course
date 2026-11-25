---
title: Scoring the opportunities
minutes: 12
---

## A simple, defensible scoring model

You need a ranking you can explain to your manager, your team and a sceptical
senior engineer. Score each task from 1 to 5 on six factors:

| Factor | Question | 1 = | 5 = |
|---|---|---|---|
| **Volume** | Hours per month across the team? | < 5 h | > 60 h |
| **Repeatability** | Same steps each time? | Always different | Identical |
| **Checkability** | Can a person verify the result faster than doing it? | Hard to check | Quick to check |
| **Data access** | Are the inputs available to sanctioned tools? | Locked away or confidential | Ready in files, SharePoint or Jira |
| **Consequence** | Impact if an error slips through? (inverted: high consequence scores low) | Reaches AEMO or affects the GPS | Internal only |
| **Elapsed-time impact** | Does improving it move project dates? | No | Removes waits or rounds |

A simple priority score:

- **Value** = volume + elapsed-time impact
- **Feasibility** = repeatability + checkability + data access + consequence
- **Priority** = value × feasibility

Keep the formula simple enough to explain on one slide. Its purpose is to
**structure the conversation**, not to produce a precise answer.

## Reading the result

Plot value against feasibility:

| | Low feasibility | High feasibility |
|---|---|---|
| **High value** | **Strategic bets:** need groundwork (data, templates, tools) | **Do first** |
| **Low value** | Leave | **Quick wins:** good for learning and confidence |

## Common mistakes

- **Scoring the tool, not the task.** "Copilot is good at code" isn't a
  score. "Plotting is 16% of engineering time, highly repeatable and easy to
  check" is.
- **Ignoring consequence.** A high-volume task that feeds directly into a
  submission still needs a human check. That's fine, but count the check in
  the time saved.
- **Forgetting failure demand.** A task that *prevents* review comments can
  outrank one that answers them faster, even with lower volume.
- **Over-precision.** Two people's scores will differ by a point. If the
  ranking flips because of that, the tasks are close: decide on other grounds.

## Getting AI to help, safely

Copilot can draft a first-pass score for each task from a written rubric,
with a one-line reason per score. **You** review and adjust, especially
consequence and data access, which need your judgement. The reasons make your
review fast. Same pattern as before: ask for evidence, check the evidence.

## What would you do?

Two candidates come out level:
**(a)** an automated pre-submission consistency check of the R1 package, and
**(b)** AI-drafted first responses to review comments.

**Which would you fund first, and what does the scoring model miss in this
comparison?**
