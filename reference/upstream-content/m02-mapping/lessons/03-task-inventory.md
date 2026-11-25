---
title: Building the task inventory
minutes: 10
---

## From stages to tasks

The value-stream map shows *where* time goes. The **task inventory** breaks it
into units small enough to improve. A good task is:

- **Specific:** "Produce FRT plots for the study report", not "Studies".
- **Repeatable:** it happens on most projects, or every week.
- **Owned by a role:** engineer or grid lead.
- **Measurable:** you can estimate hours per occurrence and occurrences per month.

## The five categories of lost time

The plan for this course groups opportunities into five categories. Tag every
task with one:

| Category | Engineer examples | Grid lead examples |
|---|---|---|
| **Repetitive drafting** | Report sections, model documentation | Status reports, routine correspondence |
| **Study and post-processing toil** | Case setup, batch runs, plots, results tables | — |
| **Review comment churn** | Technical responses, re-runs | Comment register, chasing owners |
| **Coordination overhead** | Internal reviews, handovers | Meetings, actions, schedule updates |
| **Knowledge loss** | "How did we fix this last time?" | "What did we agree with this TNSP?" |

## Where the data comes from

| Source | Gives you | Watch out for |
|---|---|---|
| Timesheets with task codes | Hours by task and role | Codes too coarse, or used inconsistently |
| Jira / task tracker | Counts, cycle times | Only covers what gets ticketed |
| Comment registers | Comment volume, categories, repeats | Different formats per project |
| Short interviews | The "why" and the frustrations | Recency bias |
| A two-week diary | Fine detail | Effort to keep up |

Use **at least two sources** and compare them. If the timesheets say plotting
is 5% of the week and every engineer complains about it, find out why.

## Where AI helps with the inventory itself

This is the first practical use for your own work as a leader:

- **Categorising free text:** hundreds of comment descriptions or timesheet
  notes sorted into categories, with you checking a sample.
- **Summarising interviews:** themes from your notes, with quotes.
- **Analysis through code:** Copilot writes the script that totals hours by
  task and role. You check the script, not each number.

That last point matters. **Totals and percentages come from code, not from the
chat.** Lab 2 shows you why.

## Confidentiality reminder

At work, use only sanctioned tools for real timesheet and comment data.
Individual timesheet data is personal information: report by role and task,
not by person, when you share results.

## What would you do?

Raj says: "Timesheets are fiction anyway. Everyone just books to the project code."

**How do you get a usable picture of where engineering time goes, without
creating a reporting burden the team resents?**
