---
title: Mapping the connection value stream
minutes: 12
---

## What a value-stream map shows

A value-stream map follows **one unit of work** from start to finish. For your
team, that's one connection project. For each stage it records:

- **Inputs and outputs:** what comes in, what goes out.
- **Who:** which roles do the work.
- **Touch time:** the hours of active work.
- **Wait time:** the calendar time waiting on others.
- **Rework loops:** where work comes back.
- **Handoffs:** where work passes between people or organisations.

## A first-pass map for a NEM connection

| Stage | Main outputs | Who | Typical rework loop | Main waits |
|---|---|---|---|---|
| Enquiry / application | Preliminary studies, application data | Engineer, grid lead | Data requests | TNSP response |
| GPS negotiation (5.3.4A) | Proposed GPS, justification studies | Engineer, grid lead | Negotiation rounds | TNSP and AEMO positions |
| R1 package | Models, DMAT, study reports, documentation | Engineers | **Review comment rounds** | AEMO / TNSP review |
| Commissioning | Test plans, hold point submissions, test results | Engineers, grid lead | Hold point queries | Site and network access, approvals |
| R2 validation | Validated models, validation report | Engineers | Validation comments | AEMO review |
| Ongoing compliance (rule 4.15) | Compliance monitoring, alteration submissions (5.3.9) | Engineers | Ad hoc queries | Variable |

*(Clause references are for orientation. Check them against the current NER.)*

The grid leads' work runs alongside every stage: correspondence, status,
schedule, risk and commitments.

## Where to look on the map

Five signals point to the best opportunities:

1. **Repeated rework loops.** Review rounds are the obvious one. How many
   rounds? How many comments per round? How many repeat earlier ones?
2. **Long waits after handoffs.** Is the wait truly external, or is it
   partly because the package wasn't complete?
3. **Copy-and-transform work.** The same information re-keyed into a report,
   a register, a status update and an email.
4. **Searching.** "Has anyone seen this comment before?" "Which version of
   the model went in?"
5. **Same task, different way.** Every engineer has their own plotting
   script. Every grid lead has their own register format.

## Doing it in practice

You don't need a workshop week. A practical version:

1. **One hour with 2–3 people per role**, walking one recent project from
   start to finish on a whiteboard.
2. **Two weeks of light timesheet tagging**, using task codes rather than
   free text (the module 2 lab uses data like this).
3. **Pull the review comment registers** from two or three past projects and
   categorise them.

AI can help with steps 2 and 3, and that's the lab this week.

## What would you do?

Looking at the table, **which stage would you map in detail first for your
team, and why that one?** Think about where both touch time and elapsed time
are most at stake.
