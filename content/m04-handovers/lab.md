---
title: "Lab 4: Write the handover pack the last handover should have had"
minutes: 45
---

- **Where:** Microsoft 365 Copilot app (or Word with Copilot).
- **Data:** the Coral Ridge training folder, **only files dated up to 27 Feb 2026**: CR-00 to CR-08.
- **Goal:** generate the handover pack the outgoing lead could have written, and compare it with the note that was actually written.

## Setup (5 min)

- Open the `CR-18 Handover checklist template` and the `results-lab4` file.
- Read **CR-08**, the outgoing lead's handover note. Note what it covers and what it leaves out.

## Part A: the sweep (15 min)

Run the Step 1 handover prompt from lesson 3, with:

- [PROJECT] = Coral Ridge Wind Farm
- [OUTGOING] = Priya Nair, [INCOMING] = Tom Hale
- Scope: **files CR-00 to CR-08 only**. Reference them with `/`, or attach them.

Then run Steps 2 and 3.

## Part B: compare (15 min)

In `results-lab4`, make three lists:

- **Copilot found, the note missed**
- **The note had, Copilot missed**
- **Neither:** things only a person would know (check the tone and context of CR-08)

## Part C: hindsight check (5 min)

Open CR-10, the customer's complaint of 22 Apr 2026. **Would the Copilot pack have prevented it?** Say which section it would have appeared in.

## Part D: the challenge (5 min)

Run Step 4, with Copilot playing the incoming lead. Are its five questions good ones? Which would you have missed?

## Reflect

1. Which section of the pack carried the most risk?
2. How long did the Copilot pack take you, compared with writing one from scratch?
3. What would you add to the prompt for your own team's handovers?

Write one line in `results-lab4` as your takeaway.

## If something isn't available

- **Chat-only:** attach CR-00 to CR-08 (nine files) and say "using only the attached files" in each prompt.
- **Copilot picks up later events:** restrict it explicitly ("only information dated on or before 27 Feb 2026"). If later files still appear, note it in your results. That is a lesson in scoping, not a failure of the lab.

## Answer key (for checking your results)

**Copilot should find that the note missed:**

| Item | Source |
|---|---|
| Commitment: model package to the customer by **31 Mar 2026** | CR-05 |
| Commitment: **status update to the customer every Friday** | CR-07 |
| Open item: **remote setpoint signal interface with the plant controller vendor** (action from 14 Aug 2025, no close-out found) | CR-04 |

**The note had, and Copilot may underweight:**

- The customer is under pressure from its lenders on schedule, so keep them informed early (CR-08). This is judgement and belongs in the watch-outs section.

**Decisions in force at 27 Feb 2026:** DEC-01 voltage control mode (CR-04) and DEC-03 harmonic study by the customer's consultant (CR-06). Both are correct *at that date*. Check the later files and you will see that DEC-03 was reversed in April.

**Hindsight:** yes. Both parts of the customer's complaint (the late model package and the stopped Friday updates) would have appeared in the commitments section.
