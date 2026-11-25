---
title: Where it breaks in engineering work
minutes: 12
---

## A failure catalogue for a grid team

You don't need to fear AI output; you need to know **where to look**. These
are the failure modes that matter most for connection work, roughly in order of
risk.

### 1. Invented specifics

Clause numbers, parameter values, guideline section names, dates of rule
changes. They are fluent, formatted correctly and sometimes wrong. **Check every
specific against a source**, ideally one the model was told to quote.

### 2. Stale knowledge

The model may describe an older version of a clause or a superseded AEMO
guideline with full confidence. **Always tell it which version applies and give
it that text.**

### 3. Silent scope drift

Asked to "summarise the TNSP's comment", it may also *resolve* the comment by
proposing a fix you never asked for. Ask for one thing at a time. Say what is
out of scope.

### 4. Numbers and units

Per-unit vs MVA bases, ms vs s, MW vs MVAr. Models are better at arithmetic
than they used to be, but a slip in a base conversion is easy to miss.
**Have the AI write code to do the calculation**, then check the code and
its result. Don't accept a figure it worked out in its head.

### 5. Agreeable answers

Ask "this response is compliant, isn't it?" and you'll often get yes. Ask
neutrally, or ask it to **argue the other side**: "You are the AEMO reviewer.
List the strongest objections to this response."

### 6. Confident tone, everywhere

The tone doesn't change between a well-supported statement and a guess. Don't
read confidence from style. Read it from **evidence**: quotes, references,
runnable code.

## Verification patterns that scale

You can't check everything line by line. That would wipe out the gain. Use
patterns that make checking cheap:

| Pattern | How | Good for |
|---|---|---|
| **Quote-backed claims** | Every claim must quote its source sentence | Requirements, comment responses |
| **"Not stated" allowed** | Explicitly allow gaps | Extracting from documents |
| **Code, not mental maths** | AI writes the script, you check the script | Study post-processing, calculations |
| **Adversarial review** | Second pass as the reviewer or a sceptic | Draft submissions and memos |
| **Spot-check by risk** | Check 100% of clause references and values, sample the prose | Long reports |
| **Two-person rule** | AI draft → engineer checks → second engineer approves | Anything that goes to AEMO or the TNSP |

## Accountability doesn't move

Whoever signs the study report or the comment response owns it, however it was
drafted. Where professional registration applies (for example RPEQ for
professional engineering services in Queensland), the obligation is the same.
**AI changes how the work is produced, not who is responsible for it.** Your
team AI standard (module 7) will put this in writing.

## What would you do?

Mei says: "If I have to check everything the AI writes, it isn't saving me
time."

**Using the table above, how do you answer her for (a) a study report and (b)
a round of comment responses? Where is checking cheap, and where does it stay
expensive?**
