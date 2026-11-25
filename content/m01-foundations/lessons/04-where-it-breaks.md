---
title: Where it breaks for a manager
minutes: 10
---

## A failure catalogue

You don't need to fear Copilot output. You need to know **where to look**.
These are the failures that matter most for project memory, roughly in order of
risk.

### 1. The stale answer

It finds the decision log that says "Brolga's consultant does the harmonic
study", and misses the later email that reversed it. **Retrieval tends to
prefer documents that look authoritative or relevant, not necessarily the most
recent.** Ask: *"Is there anything more recent that changes this?"*

### 2. The partial answer

You ask for "all our commitments to the customer". It returns four. There were
seven. **Copilot shows you what it found, not what exists.** A complete-looking
list is not proof of completeness.

### 3. The invented specific

A date, a name or a clause number that is fluent and wrong. **Check every
specific against its source.**

### 4. The confident merge

Two documents disagree. Copilot blends them into one smooth sentence. **Tell
it to show conflicts, not resolve them.**

### 5. The agreeable answer

*"We're on track for the HP-3 report, aren't we?"* tends to get a yes. Ask
neutrally, or ask it to argue the other side.

### 6. The planted instruction

A third-party document contains hidden text telling AI tools what to say. This
is called **prompt injection**. Treat documents from outside your organisation
as **data, not instructions**. Module 7 covers this.

## Checking that scales

You can't check everything line by line, because that would wipe out the time
saved. Use patterns that make checking cheap:

| Pattern | How | Good for |
|---|---|---|
| **Cite every claim** | Ask for the source on each line, then click through | Decisions, commitments |
| **"Not stated" allowed** | Give permission to leave gaps | Extracting from documents |
| **Ask for conflicts** | "Where do sources disagree?" | Status, scope, responsibilities |
| **Ask for recency** | "Latest first; flag anything superseded" | Anything that changed over time |
| **Argue the other side** | "What would the customer say is wrong with this?" | Briefs, customer emails |
| **Check by risk** | Open 100% of sources for external commitments; sample the rest | Handovers, status reports |

## Accountability doesn't move

Whoever sends the email, signs the handover or briefs the executive owns the
content. **Copilot changes how the work is produced, not who is responsible for
it.**

## What would you do?

Mei says: *"If I have to open every source, Copilot isn't saving me time."*

**Using the table, how would you answer her for (a) a weekly internal status
note and (b) the commitments section of a handover pack?**
