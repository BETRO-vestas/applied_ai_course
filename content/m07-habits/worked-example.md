---
title: "Worked example: the Grid Delivery memory charter (draft to wired in)"
minutes: 10
---

Everything here is fictional. The team is the fictional Grid Delivery team, and
the record is the Coral Ridge training folder.

## 1. The traps the charter has to stop

Each trap from lesson 1, the record it came from, and the habit that prevents it:

| Trap in the Coral Ridge record | What went wrong | Charter habit |
|---|---|---|
| Reversed decision (harmonic study, CR-06 → CR-09) | Decision log not updated after VO-03 | 1. Decisions |
| HP-2 contradiction (CR-12 → CR-13) | Test plan Rev 1 not revised after the waiver | 5. Status |
| Out-of-date contact (CR-01 → CR-11) | Contact list not maintained | 5. Status (contact lists too) |
| Lost commitment (model package date, CR-05 → CR-10) | Promise made by email, never logged | 2. Commitments |
| Derived date (HP-3 report due 28 Oct 2026, CR-14) | Rule agreed, date never written down | 2. Commitments ("by when" is a date) |

## 2. The draft and the sceptic's review

Part A produced a draft of seven habits in Copilot in Word. Part C asked a
sceptical senior engineer which would be ignored within a month:

| Draft habit | Sceptic's view | What we did |
|---|---|---|
| Transcribe internal meetings by default | Depends on policy and gets ignored | Kept as "where policy allows". The confirmation email is the firm habit |
| Verify every source before anything goes external | Too heavy for a two-line update | Limited to dates, names and commitments in external documents |
| Handovers as a separate habit | Already covered by the module 4 handover pack | Dropped. The manager's commitment check moved into habit 2 |

Six habits remain, which is within the 5–7 range.

## 3. The charter

| # | Habit | Rule | Owner | How we'd know |
|---|---|---|---|---|
| 1 | Decisions | Post `DECISION:` in the project channel within 2 working days. Post `CHANGE:` when a decision is replaced | Grid Lead | Each scope or schedule decision in the decision log has a matching line in the channel |
| 2 | Commitments | Write `COMMITMENT: who / what / by when` in a follow-up email or the channel within 2 working days. "By when" is a date, not "soon". The manager checks commitments at each handover | Whoever made the promise | Every commitment in the register has a date and a source |
| 3 | Naming | Emails, meetings and files start with project code, topic, identifier and date | Everyone | Spot check of 10 new files a month |
| 4 | Meetings | Send a confirmation email after every external meeting. Transcribe internal meetings where policy allows | Chair | Every external meeting has a confirmation email |
| 5 | Status | Controlled documents and contact lists carry a status line. Add a change note within a week when an agreement changes them | Document owner | No "Rev" document in the folder lacks a status line |
| 6 | Verification | Before anything goes external, open the sources for every date, name and commitment | Sender | A reviewer finds no unsourced date in an external update |

## 4. Wiring the charter into the agent (version 3)

Part D added this block to the version 2 instructions of **Coral Ridge Memory**:

> **CHARTER**
> Search first for lines starting DECISION:, CHANGE: and COMMITMENT:.
> Prefer documents whose status line says Current. If a status line says
> SUPERSEDED, show the newer document and say which one replaces it.
> If a document has no status line, say so and treat its date as unconfirmed.

Then the known-answer questions 4 to 6 were rerun:

| Question | Version 2 | Version 3 | Note |
|---|---|---|---|
| 4. Reversed decision | C | C | Now cites the VO-03 email as the source of the change |
| 5. HP-2 contradiction | C | C | Rev 1 still has no status line in the folder, so the agent relies on the later meeting note (CR-13) |
| 6. Out-of-date contact | C | C | No contact list was changed, so nothing new to find |

**Did the charter change any answers?** No. The training folder was written
before the charter, so the habits have nothing new to pick up. The real test is
on records written after the charter starts.

## 5. Keeping score

These figures are illustrative, from a manual count in the team channel after
four weeks:

- External commitments logged with a date within 2 working days: **9 of 11**.
- Scope and schedule decisions with a `DECISION:` line: **3 of 3**.
- Documents touched this month with a status line: **6 of 8**.

## 6. Measure, risk and message

- **Success measure:** commitments logged with a date within 2 working days
  (counted monthly).
- **Main risk:** the habits become a tick-box exercise, or they cost too much
  time in a busy week. Review the six habits quarterly, and drop any that do
  not survive a busy week.
- **Message to the team:** *"Six habits so the Third Brain can find what we
  decided and promised, and nobody has to remember it. Each has a named owner,
  and we'll drop any that don't work."*

## 7. What it still gets wrong

- Documents written before the charter carry no markers, so the agent finds
  them only through ordinary search.
- A promise made in a corridor is in no channel, so no habit or agent can find
  it. Only the confirmation email closes that gap.
- Habits do not fix history. Test plan Rev 1 still says what it said, and the
  agent still needs the later meeting note to answer question 5.

*Chat-only path:* put the charter and the CHARTER block on the notebook's
"Agent brief" page, and start each chat with "Follow the Agent brief page."
