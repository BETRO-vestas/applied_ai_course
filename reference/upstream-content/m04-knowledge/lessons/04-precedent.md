---
title: Keeping knowledge between projects
minutes: 10
---

## "Didn't we answer this on another project?"

In lab 2's fictional data, about one comment in eight repeated an earlier
comment. Across a portfolio, the same TNSP asks the same questions on
project after project. Each time, someone either remembers (if they're still
here) or works it out again.

A **comment library** fixes this: every resolved comment captured once, in a
structured form, so the next project can find it.

## What to capture

| Field | Example |
|---|---|
| TNSP or AEMO | TNSP-A |
| GPS topic | Control modes |
| Comment (generalised) | Evidence of remote mode switching requested |
| How it was resolved | Added study cases for each mode transition |
| **Reusable lesson** | Include a mode-switching section by default for TNSP-A |
| Project | For internal reference only |

The **reusable lesson** column is the valuable one. It turns a one-off fix
into a template change or a checklist item, which removes the failure demand
at its source.

## Finding precedent with AI

With a structured library, Copilot can:

1. Take a new comment.
2. Find similar past comments, by meaning not just keywords
   ("switch between modes" matches "mode transition").
3. Show the past resolution and lesson.
4. Check whether the current project already addresses it.
5. Draft a response for the engineer to review.

This is a **workflow at rung 2 (draft)**. The engineer decides.

## The confidentiality trap

Past resolutions sometimes mention the other project's developer, their data
or their results. A drafted response must **use the approach, not the
content**. Lab 4 includes a library entry that would leak another developer's
name and test records if copied. Your Copilot instructions should forbid it,
and the engineer review should catch it if the instructions fail.

## Capturing at the right moment

Knowledge capture fails when it's a separate task done "later". Make it part
of **closing a review round**: the grid lead's register already has the
comment and resolution. Adding the topic and lesson takes two minutes per
comment, and AI can draft them for confirmation.

## What would you do?

**Who should own the comment library, the grid leads or the engineers, and
what one rule would keep it from going stale?**
