---
title: "Grounding: Work, Web, or nothing"
minutes: 8
---

## Where an answer comes from

Every Copilot answer is built from three possible sources:

| Source | What it is | When it's used |
|---|---|---|
| **Model memory** | What the model learned in training | Always present in the background |
| **Web** | A Bing search of public web content | When web grounding is on |
| **Work** 🔒 | Your emails, meetings, chats and files, via Microsoft Graph | Premium licence, Work mode |

**Grounding** means making Copilot answer from a source you can check rather
than from memory. It is the most important habit in this course.

## Work vs Web

In the Microsoft 365 Copilot app, Premium users can switch between **Work** and
**Web**. Use Work for anything about your projects, people and decisions. Use
Web for public information such as standards bodies, vendor documentation and
general technical background.

Without Premium (**Copilot Chat**), Copilot is grounded on the web plus **files
you upload or open**. It cannot search your mailbox or Teams. You can still
ground it by attaching the document you care about, and the labs show how.

## Copilot only sees what you can see

With Work grounding, Copilot searches **with your permissions**. It can only
find what you could open yourself. Two consequences:

- **It won't find what isn't shared with you.** If the key decision sits in
  someone else's inbox, Copilot can't see it.
- **It will find things you didn't know you could see.** Over-shared folders
  become easy to search. That's a permissions problem, but Copilot makes it
  visible.

## A grounded prompt, compared

**Ungrounded:** *"What is the status of the Coral Ridge hold point tests?"*

**Grounded:** *"Using only /CR-12 Hold point test plan and /CR-13 Meeting
notes, list each hold point, who witnesses it and its current status. Cite the
document for each line. If the documents disagree, show both and say which is
more recent. If something isn't stated, write 'not stated'."*

The grounded prompt:

- **names the sources**,
- **restricts Copilot to them** ("using only"),
- **asks for a citation** on every line,
- **deals with conflicts** instead of quietly resolving them,
- **allows "not stated"**, so Copilot doesn't fill gaps with inventions.

## A useful mental model

Treat Copilot like a **very fast, very well-read contractor on their first
day**. They're capable, but they don't know your project, your customer or
which version of the plan applies. You wouldn't ask a new contractor to recite
the contract. You'd hand it to them.

## What would you do?

Sam asks Copilot (Web mode) about the "network operator's requirements for
harmonic studies" and gets a confident, general answer.

**What would you tell Sam to change, so the answer reflects what SouthGrid
actually asked for on Coral Ridge?**
