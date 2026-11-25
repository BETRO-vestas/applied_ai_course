---
title: A plausible model, not a validated one
minutes: 10
---

## The one idea to keep

A large language model (LLM) is **a model of what text usually looks like**.
It is not a model of what is true.

Your team already knows this distinction well. It is the difference between a
**generic model with typical parameters** and a **site-specific model validated
against test data**. The generic model gives a sensible-looking step response.
It may be close, and it is often useful early on. But you would never put it in
an R2 package without validating it.

An LLM is a generic model of language. It produces the response that *looks*
most right. That is often the right answer, but not always.

## How it works, in four lines

1. The model was trained on a huge amount of text to **predict the next word**
   (strictly, the next *token*: a word or part of a word).
2. Through that training it learned grammar, facts, reasoning patterns and the
   *style* of technical documents, including regulatory ones.
3. When you ask a question, it builds an answer one token at a time, each time
   picking a likely next token given everything so far.
4. Nothing in that loop **looks anything up** unless you give it a tool or a
   document to read.

## Why it invents clause numbers

Ask an LLM from memory: *"Which NER clause sets the settling time for voltage
control?"* It has seen a lot of NER-style text, so it knows the *shape* of the
answer: "S5.2.5.something", a time in seconds, a mention of the automatic access
standard. It will fill in that shape fluently.

If it remembered the clause well, the answer is right. If not, you get an
answer that is **perfectly formatted and wrong**, with no change in tone. The
model has no built-in sense of "I'm not sure about this one".

This is the most important failure mode for a grid team. Clause numbers,
parameter values, time constants and thresholds are exactly the details that
*look* the same whether they are right or wrong.

## Three more things that follow

- **Training cutoff.** The model's knowledge stops at a date. NER amendments,
  new AEMO guideline versions and recent rule changes after that date are
  unknown to it, unless you give it the current text.
- **It is a pattern engine, not a calculator.** Modern models reason well, but
  arithmetic on unit-heavy engineering values should be done by code or
  checked, not trusted.
- **Same question, different answers.** Generation involves some randomness,
  so asking twice can give two different answers. If they disagree, treat that
  as a warning sign.

## What it *is* very good at

- Restructuring and drafting text: reports, responses, summaries and emails.
- Reading a document you provide and extracting or comparing information.
- Writing and explaining code, such as Python for post-processing studies.
- Explaining a concept in different ways until it clicks.

The pattern is clear: **when the facts are supplied, LLMs are strong. When the
facts come from memory, they need verifying.** The next lesson builds on this.

## What would you do?

Tom tells you he asked an AI assistant which NER clause covers active power
ramp rates and pasted its answer straight into a draft response to the TNSP.
The clause reference *looks* right.

**What do you say to Tom? And what one-line rule would you give the whole team
so this doesn't depend on individual judgement?**
