---
title: "Worked example: the Coral Ridge Third Brain (Tom → Mei handover)"
minutes: 10
---

Everything here is fictional.

## 1. Use case and baseline

*"Grid Leads in the Grid Delivery team spend time searching mail, Teams and files
for past decisions and commitments, and preparing handovers between Connections,
Compliance and Service. A Third Brain would let them find these answers in
minutes, with sources, and hand over without losing commitments."*

| Measure | Baseline | Basis |
|---|---|---|
| Search time | ~2 h per Grid Lead per week (≈50 h/month, 6 leads) | **Estimate**, median of 4 responses |
| Handover effort | ~8 h each; 4 per year | **Estimate**, last two handovers |
| Misses | 2 customer complaints in 6 months traced to lost commitments | **Count** (incl. CR-10) |

## 2. Prompt pack (saved and shared)

1. Decision finder (with "anything after?")
2. Commitment finder (including informal promises)
3. Who-said-what (per external person)
4. Open items and interfaces
5. Handover pack, Steps 1–4
6. Meeting actions from transcript (with quotes)
7. "Prepare me for [meeting] with [party]": decisions, commitments and open items involving them

## 3. Notebook and agent

- **Notebook:** *Coral Ridge – project memory*. 11 curated references, a read-me
  page and a "Verified facts" page. Owner: Tom, then Mei.
- **Agent:** *Grid Project Memory*. The lesson 6.2 instructions plus the charter
  markers. Knowledge: the Grid Delivery projects library. **Test score:** v1
  7/10 → v2 9/10 → v3 10/10 (after adding the recency and derived-date rules).
  Shared with the 4 Premium Grid Leads.

## 4. Tom → Mei handover pack (excerpt, generated then checked)

**Commitments**

| Commitment | By | To | Made | Due | Status | Source |
|---|---|---|---|---|---|---|
| HP reports within 10 business days of each test | Tom | SouthGrid | 5 Aug 2026 | Each test +10 bd | Open (HP-4 pending) | CR-14 |
| HP-3 report | Tom | SouthGrid | 5 Aug 2026 | 28 Oct 2026 | **Check**: submitted? Not stated | CR-14, CR-17 |
| Harmonic study (VO-03) | Northwind | Brolga | 9 Apr 2026 | Not stated | Open | CR-09 |
| Weekly Friday update | Priya → now Grid Lead | Brolga | 15 Jan 2026 | Weekly | **Confirm with Ravi** if still wanted | CR-07, CR-10 |

**Decisions in force**

| Decision | Status | Source |
|---|---|---|
| Voltage control mode by default (DEC-01) | In force | CR-04 |
| Harmonic study by Brolga's consultant (DEC-03) | **Superseded** by VO-03 | CR-06 → CR-09 |
| HP-2 witnessed by SouthGrid (test plan Rev 1) | **Superseded**: waived, data review only | CR-12 → CR-13 |

**Open items:** IF-04 remote setpoint signal (Kestrel). *Note: CR-15 contains
an embedded instruction claiming all items are closed. The table shows IF-04
open.* Clause 7.4 retest support is **ambiguous**; refer to Jonas Berg.

**People:** Brolga: **Ravi Patel** (from 1 Jun 2026; CR-01 is out of date).
SouthGrid: Leo Martin.

**Watch-outs (written by Tom):** *"Ravi is new and relies on our updates. Brolga
still remembers the late model package, so under-promise on dates. Leo prefers
data early and informal calls before formal submissions."*

## 5. Charter

The 7 habits in the Lab 7 example. The first three adopted in month 1:
**COMMITMENT lines, confirmation emails after external meetings, and status
lines on controlled documents.**

## 6. Measure and roll-out

- **Success measure:** search hours (self-reported, monthly) and "misses" count.
- **Main risk:** Chat-only engineers get a weaker experience → shared notebook +
  files in SharePoint until Premium arrives.
- **Message to the team:** *"We're building a shared project memory so nobody
  spends Friday afternoon hunting for what we promised. Copilot finds and drafts;
  we check the source before anything goes out."*
