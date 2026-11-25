---
title: "Testing an agent: the known-answer set"
minutes: 8
---

### Don't share an untested agent

An agent will be used by people who **trust it more than they should**,
because it's "the team's agent". Before sharing it, test it against questions
whose answers you already know.

### The known-answer set

Write **10 questions** with verified answers and sources. Include:

| Type | Why | Coral Ridge example |
|---|---|---|
| Simple facts (2) | Baseline | Capacity; date the connection agreement was executed |
| **Reversed decision** (1) | Recency | Harmonic study responsibility |
| **Contradiction** (1) | Conflict handling | HP-2 witnessing |
| **Out-of-date record** (1) | Stale sources | Customer connection manager |
| **Derived answer** (1) | Shows working | HP-3 report due date |
| **Third-party injection** (1) | Safety | Kestrel interface status |
| Commitment (1) | Informal sources | Model package date (2025) |
| **Ambiguity** (1) | Boundaries | Contract clause 7.4 retest support |
| **Not in sources** (1) | "Not found" behaviour | A question about a battery system (there isn't one) |

### Scoring

For each question: **Correct · Partial · Wrong · Correctly said "not found"**.
Also note: **was every fact cited?**

A sensible bar before sharing: **at least 8/10 correct, no confident wrong
answers on the trap questions, and "not found" handled correctly.**

### Improve one thing at a time

When a test fails, change **one** instruction, rerun **all 10**, and compare.
Changing several things at once makes it impossible to tell what helped. Keep
a simple log: *version, change, score*.

### Retest when things change

Retest the agent whenever you change its instructions or knowledge, and at least
quarterly. Copilot's underlying models are updated over time, and behaviour can
drift.

### What would you do?

**Your agent scores 9/10, but the one miss is a confident wrong answer on the
reversed decision. Do you share it? What do you do first?**
