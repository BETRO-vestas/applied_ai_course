---
title: Copilot as an engineer's pair programmer
minutes: 12
---

## Prompts that work for engineering code

| Do | Instead of |
|---|---|
| **Spec first:** inputs, outputs, units, definitions | "Write a script to check the step response" |
| **Small steps:** load data → compute one metric → test → next | One huge prompt for the whole tool |
| **Name the definition:** "rise time as defined in gps-criteria.json" | "Calculate the rise time" |
| **Ask for a check:** "Print the totals so I can verify them" | Trusting silent output |
| **Ask it to explain:** "Walk me through how settling time is found" | Reading 200 lines cold |

## Custom instructions: the team's standing brief

A file at `.github/copilot-instructions.md` in a repository is added to every
Copilot request in that repository. For a study-automation repo it might say:

```markdown
- Units: SI and per unit; state the base in every variable name
  (v_poc_pu, q_poc_mvar, t_s).
- Time in seconds, as float.
- Every GPS metric must cite its definition from gps-criteria.json.
- No hard-coded limits; read them from the criteria file.
- Plots: time on x-axis in seconds, limits shown as dashed lines,
  case name in the title.
- Standard library + numpy, pandas, matplotlib only.
```

This is where **team standards become automatic**. Every engineer's Copilot
writes code the same way, which makes review faster and sharing easier. Lab 3
starts by editing one.

## Reviewing AI-written engineering code

Review it the way you'd review a graduate's script, focusing on where
engineering errors hide:

1. **Units and bases.** Is it pu or MVAr? Which base?
2. **Sign conventions.** Generator or load convention for Q? Import or export?
3. **Time windows.** Which samples define "initial" and "final"? Off-by-one at the step?
4. **Sampling.** Does the answer depend on the sample interval? Are results
   rounded to the next sample?
5. **Edge cases.** What if the response never reaches 90%? Never settles?
   Does it crash or report a pass?
6. **Silent assumptions.** Did it filter, interpolate or trim data without
   saying so?

Point 5 matters most. **Code that fails quietly can report a pass on a case
that should fail.** Ask Copilot directly: *"What happens if the signal never
settles? Show me."*

## Agent mode for engineering code

Agent mode can write the script, run it, read the error and fix it in a
loop. That's powerful. But **"it runs" is not "it's right"**. The loop
fixes crashes, not engineering logic. The known-answer test (lesson 4) is what
checks the logic.

## What would you do?

Raj says he won't accept any AI-written code into the team's study tools.

**What review rules would make you, and Raj, comfortable? Pick three from the
list above and say how you'd enforce them.**
