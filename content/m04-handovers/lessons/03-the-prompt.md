---
title: The handover prompt
minutes: 8
---

## The one idea to keep

Run the handover as a sequence of prompts, not one. A single large request gives
a long answer that looks complete but is shallow. Each follow-up prompt goes
back to the sources and deepens one section, which is how the informal items
(the chat promise, the "by Friday") get found.

## Step 1: the sweep

Paste this into Microsoft 365 Copilot, filling in the brackets:

> I'm handing over [PROJECT] from [OUTGOING] to [INCOMING], who has not worked
> on it. Using emails, Teams chats, meetings and files about [PROJECT] since
> [START DATE], draft a handover pack with these sections: 1 Project snapshot,
> 2 Decisions in force, 3 Commitments, 4 Open items and risks, 5 People, 6 Where
> things are. Use tables. Every line needs a source link and a date. Use these
> status words only: Open, Done, Superseded, At risk, Not stated. If a later
> source changes an earlier one, mark the earlier one Superseded and show both.
> Do not write a watch-outs section; I will write that.

## Step 2: deepen the commitments

> Search again for commitments made informally in chats and emails, such as
> "I'll", "we will", "by Friday" and "every week". Add any you missed, with
> source and date.

Informal commitments are the most common gap, so this step earns its time.

## Step 3: deepen the decisions

> For each decision in section 2, check whether anything later changes or
> reverses it. Update the status and show the history.

## Step 4: challenge

> You are [INCOMING]. Read this pack and list the five questions you would still
> need answered before your first customer meeting.

## Chat-only path

If Copilot's search is not available, attach the key files (decision log, the
last three months of meeting notes, exported email threads) and run the same
prompts with "using only the attached files". The result is less complete, so
say so at the top of the pack.

## Where the prompts fall short

- Copilot cannot see a conversation that was never written down.
- A source that is not in the search scope will not appear, and Copilot may not
  say so. Check the scope yourself.
- A "Not stated" line is more useful than a confident guess. Keep them.

## What would you do?

Step 4 asks Copilot to play the incoming lead. Who else on your team should it
play, and what would that perspective catch that the incoming lead would miss?
