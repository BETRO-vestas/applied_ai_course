---
title: Requirements traceability for a connection
minutes: 12
---

## The chain reviewers want to follow

Every GPS requirement should trace to evidence:

1. **NER clause**
2. → **GPS requirement**
3. → **study case or test**
4. → **result**
5. → **document and section**

A **compliance matrix** (or traceability matrix) is that chain as a table:
one row per requirement, with the evidence and a status. Many TNSPs ask for
one. Even when they don't, it's the fastest way to answer "where do you show
that?". Most review comments are some form of that question.

| GPS ID | Requirement (quoted) | Evidence | Status |
|---|---|---|---|
| GPS-4 | "rise time ≤ 2.0 s and settling ≤ 5.0 s…" | Study report Rev C §5, cases VS-01–04 | Evidenced |
| GPS-5 | "switchable remotely…" | — | **Gap** |

## Why it's worth the effort

- **Finds gaps before the reviewer does.** A Gap row found internally costs a
  study. A Gap found by AEMO costs a review round.
- **Makes responses fast.** Most comments are answered by pointing at a row.
- **Survives staff changes.** The reasoning isn't only in one engineer's head.
- **Directly targets failure demand** (module 2). "Missing or unclear study
  case" was one of the biggest comment categories in lab 2's data.

## Where AI helps, and where it mustn't decide

| Step | AI role | Human role |
|---|---|---|
| Extract requirements from the GPS | Draft rows with exact quotes | Check quotes and coverage |
| Find candidate evidence | Search reports and propose links with quotes | **Confirm each link** |
| Assign status | Propose Evidenced, Partial or Gap with reasons | **Decide**, especially Partial |
| Check against TNSP requirements | Flag likely shortfalls | Decide what to fix |

The rule from module 1 applies: quote-backed claims make checking cheap. A
matrix row with a quote can be confirmed in seconds. A row without one has to
be re-researched.

## The traps

- **Superseded documents.** The evidence exists, but in a revision produced
  with an old model. It looks like evidence and isn't.
- **Partial coverage.** "Voltage disturbance ride-through" covered for
  overvoltage only. A keyword search finds it and calls it done.
- **Evidence by assertion.** "The plant complies with GPS-7" in the summary
  isn't evidence. The study section is.

Lab 4 has all three.

## What would you do?

**Should your team build the compliance matrix at the start of R1 preparation,
or at the end before submission? What changes about how the team works if it's
at the start?**
