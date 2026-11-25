---
title: "The anatomy of a good prompt: Goal, Context, Source, Expectations"
minutes: 8
---

## The one idea to keep

A good prompt says what you want, why, what it should use, and what shape the answer should take.

## Why most prompts underperform

The most common manager prompt is one line: *"Summarise the Coral Ridge emails."* Copilot does its best, but it has to guess which emails, for what purpose, for whom and in what shape. Every guess is a chance to miss.

Microsoft's own guidance describes four parts of a good prompt. They are worth memorising.

| Part | Question it answers | Example |
|---|---|---|
| **Goal** | What do you want? | "List the commitments Northwind has made to Brolga Energy" |
| **Context** | Why, and for whom? | "I'm preparing a handover to a new Grid Lead who starts Monday" |
| **Source** | What should it use? | "Use emails and meeting notes about Coral Ridge since June 2025" |
| **Expectations** | What shape, and what rules? | "A table: commitment, who made it, to whom, date, due date, source. Say 'not found' if you can't find a due date" |

## Before and after

**Before:** *"Summarise Coral Ridge."*

**After:**
*"Goal: list every commitment Northwind has made to Brolga Energy on Coral Ridge Wind Farm.
Context: I'm preparing a handover for Tom Hale, who takes over as Grid Lead next week and has never worked on the project.
Source: my emails, Teams chats and meeting notes mentioning Coral Ridge or Brolga since June 2025.
Expectations: a table with commitment, who made it, to whom, date made, due date and a link to the source. Newest first. If a due date isn't stated, write 'not stated'. After the table, list anything that looks like a commitment but that you aren't sure about."*

The second prompt is longer, and it takes about 60 seconds more to write. It saves you a rework loop, and it produces something you can check.

## You don't need all four every time

- Quick, low-stakes question: Goal only.
- Drafting for an audience: add Context.
- Anything factual about your projects: **always add Source**.
- Anything you'll reuse or send: **always add Expectations**.

## What would you do?

Your manager asks: *"Can you send me a short summary of where Coral Ridge is at?"*

**Write the Goal, Context, Source and Expectations you would give Copilot. What does "short" mean for your manager?**
