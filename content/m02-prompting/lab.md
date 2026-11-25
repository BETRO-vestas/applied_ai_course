---
title: "Lab 2: Rewrite three weak prompts"
minutes: 35
---

- **Where:** Microsoft 365 Copilot app.
- **Data:** the Coral Ridge training folder.
- **You'll need:** CR-04, CR-12, CR-13 and CR-14.

## Setup (5 min)

Open `results-lab2`. It has a scoring grid: Goal, Context, Source, Expectations and Checkable (0–2 each, 10 max).

## Part A: score the weak prompts (5 min)

Score each one before running it:

1. *"What's happening with hold points?"*
2. *"Write an update for the customer."*
3. *"What did SouthGrid want?"*

## Part B: run weak vs strong (20 min)

For each prompt:

- Run the weak version in a **new chat**, with no attachments. Note the result.
- Rewrite it using the GCSE structure (Goal, Context, Source, Expectations). Reference the files with `/` 🔒, or attach them (Chat-only).
- Run your rewrite in a new chat. Note the result.
- Score both outputs: is it correct, complete, checkable and usable without editing?

Suggested sources:

| Prompt | Sources |
|---|---|
| 1 | CR-12, CR-13, CR-14 |
| 2 | CR-13, CR-14 (audience: Ravi Patel, Brolga Energy) |
| 3 | CR-04, CR-13, CR-14 |

## Part C: save one (5 min)

Turn your best rewrite into a **template** with [PLACEHOLDERS] and save it to your saved prompts. Paste it into `results-lab2` too.

## Reflect

1. Which of the four parts made the biggest difference?
2. Did any rewrite catch the HP-2 contradiction between CR-12 and CR-13? Which instruction did that?
3. How long did a strong prompt take to write, compared with fixing a weak answer?

## If something isn't available

- **No `/` file references (Chat-only):** upload the files with the paperclip.
- **Can't save prompts:** keep them in a Word or OneNote page instead.

## Answer key (what a strong rewrite of prompt 1 should surface)

- **HP-1** (power quality baseline): no witness required. Status: complete (per CR-17).
- **HP-2** (reactive power capability): CR-12 Rev 1 says *witnessed by SouthGrid*. CR-13 (18 June, confirmed 20 June) says **witnessing waived; data review only**. A good answer **flags the conflict** and names CR-13 as more recent.
- **HP-3** (voltage control step tests): witnessed by SouthGrid. Tested 14 Oct 2026. Report due **28 Oct 2026** under Tom's commitment of 10 business days (CR-14).
- **HP-4** (active power and frequency response): not yet tested.
