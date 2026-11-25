---
title: How Copilot finds things in your work data
minutes: 8
---

### Retrieval in four steps

When you ask a Premium Copilot about your work 🔒, it doesn't read your whole
mailbox. It:

1. **Interprets** your question and turns it into search queries.
2. **Searches** Microsoft Graph (mail, chats, meetings, files) **with your
   permissions**.
3. **Takes the top results**, a limited set of passages that it actually
   reads.
4. **Writes an answer** from those passages, with citations.

The model only "knows" what came back in step 3. **If the right email isn't in
the top results, it doesn't exist for that answer.**

### What makes something easy to find

| Easy to find | Hard to find |
|---|---|
| Specific, unique terms ("VO-03", "HP-2") | Generic words ("the scope change") |
| Meaningful file names and email subjects | "Re: Re: FW: quick question" |
| Content in shared files and recorded meetings | Decisions made in a hallway or by phone |
| Recent, frequently opened items | Old items no one has touched |
| Text | Scanned images, screenshots of tables |

### What this means for a manager

Retrieval quality depends on **two things you can influence**:

- **How you ask:** specific terms, time scope, people, type. That's Module 2.
- **How the team records things:** subject lines, decision logs, meeting
  naming, recording and transcripts. That's Module 7, and it's the bigger
  lever.

### A note on the lab files

In this course, emails and chats are **exported as documents** in a training
folder, so Copilot treats them as files. Real email search is similar, but not
identical: real messages carry sender, date and thread information, which
helps. Lab 3 ends with an optional, low-stakes exercise on your own mailbox.

### What would you do?

An engineer says: *"Copilot couldn't find the SouthGrid agreement on HP-2, so
it doesn't exist."*

**What three explanations would you check before accepting that?**
