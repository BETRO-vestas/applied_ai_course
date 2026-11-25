---
title: Turning GPS requirements into code
minutes: 12
---

## A requirement isn't a measurement yet

The fictional Larkspur Downs GPS says:

> *Voltage control: rise time ≤ 2.0 s and settling time ≤ 5.0 s for a 5%
> setpoint step.*

To write code for that, you need answers to questions the sentence doesn't
settle:

- **Rise time from when to when?** From the setpoint step to reaching 90% of
  the change? 10% to 90%? To first crossing 100%?
- **"The change" measured how?** Initial and final values averaged over which
  windows?
- **Settling band:** ±10% of the change? ±5%? Of the change or of the final value?
- **Measured where?** At the connection point, or at the turbine terminals?

The NER glossary, the GPS itself and AEMO's guidelines may define some of
these. **Where they do, use their definitions. Where they don't, your team
must choose, write it down, and apply it the same way every time.** Check the
current NER definitions for rise time and settling time before relying on any
summary, including this one.

## Make definitions data, not code

Lab 3 uses a file `gps-criteria.json` that holds each **definition in words**
and each **limit as a number**. The code reads limits from the file and
implements each definition literally. That has three benefits:

1. **Reviewable:** an engineer can check the definition without reading Python.
2. **Reusable:** a new project's GPS means a new criteria file, not new code.
3. **Auditable:** the report can quote exactly which definition was applied.

## Pass, fail or marginal

A checker should produce more than PASS/FAIL:

| Result | Meaning | Action |
|---|---|---|
| **Pass** | Comfortably inside the limit | Report |
| **Marginal** | Within, say, 10% of the limit | Engineer reviews the plot |
| **Fail** | Outside the limit | Investigate tuning or the model |
| **Can't assess** | Never settled, missing data, step not found | Engineer investigates. Never report as pass |

The **"can't assess"** state is the most important one to build in. It's where
silent failures would otherwise hide.

## Where AI fits

- **Copilot drafts the checker** from the criteria file and your conventions.
- **You own the definitions**: AI can list options ("10–90% or 0–90%?"), but
  choosing is an engineering decision.
- **AI must not invent limits.** If a criterion isn't in the file, the code
  should say "not assessed", not guess.

## What would you do?

Two engineers on the fictional team measure rise time differently: one from
the step to 90%, the other from 10% to 90%. Both have been submitting studies
for years.

**What do you do about past submissions, and what do you change going forward?**
