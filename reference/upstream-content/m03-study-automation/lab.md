---
title: "Lab 3: A GPS checker you can trust"
minutes: 75
---

- **Where:** your work laptop, VS Code + GitHub Copilot, Python. numpy, pandas and matplotlib are useful but optional; the core works with the standard library.
- **Data:** fictional, exported study and test data in the lab files (`lab-m03`). No simulation licence is needed.
- **Goal:** a checker for the fictional Larkspur Downs voltage control and fault ride-through criteria, tested against known answers.

| File | What it is |
|---|---|
| `data/vstep_case01–04.csv` | Voltage setpoint step responses (case 04 is "measured" data with noise) |
| `data/frt_case01–03.csv` | Fault ride-through responses: voltage, reactive current, active power |
| `tests/known_first_order_tau0p5.csv` | A signal with a known exact answer |
| `gps-criteria.json` | Fictional limits, with each metric defined in words |
| `.github/copilot-instructions.md` | Starter team conventions |

## Part A: set the conventions (10 min)

1. Unzip the lab files and open the `lab-m03` folder in VS Code.
2. Read `.github/copilot-instructions.md`. **Edit it** to match how your team
   would want code written. Add at least one rule of your own.
3. Read `gps-criteria.json`. Note every definition, and ask yourself whether
   your team would define it the same way.

## Part B: build the voltage step checker (20 min)

1. In **Agent** mode, run `.github/prompts/build-checker.prompt.md`.
2. Before looking at the results, **review the code** using
   `review-checklist.md`. Pay most attention to items 3 (time windows) and 5
   (what happens if the signal never settles).
3. Fix anything you find, with Copilot's help or by hand.

## Part C: known-answer test first (10 min)

1. Run the checker on `tests/known_first_order_tau0p5.csv`. The exact answer
   is τ·ln(10) = 1.151 s for both rise and settling time.
2. Explain the difference between the checker's answer and 1.151 s.
3. Ask Copilot to create `test_gps_check.py` (`unittest`) that checks this
   signal **and** a signal that never settles (it should report "can't assess",
   not pass). Run the tests.

## Part D: run the cases (10 min)

Run all four voltage step cases. Record rise time, settling time and result
in `results.md`. Open the plots, if you made them, and check each result
against what you see.

## Part E: the noisy case (10 min)

Case 04 is the same response as case 01, but with measurement noise.

1. What does the literal check report? Why?
2. Ask Copilot for two or three filtering options with their trade-offs.
   Choose one and **document it in the code**.
3. Compare the filtered result with case 01. Is it the same? Why not?

## Part F: fault ride-through (15 min)

Ask Agent mode to extend the checker for `fault_ride_through` in the
criteria file, using its definitions literally. Run the three FRT cases. Then
look closely at the **pre-fault window definition**: does it start before the
fault actually begins? What does that do to the result?

## Reflect

Answer the questions at the bottom of `results.md`. Mark the lab done and note
how long building the checker would have taken without Copilot.

---

## Answer key

Try the lab first. These results come from a literal implementation of the
definitions, with 10 ms samples for voltage steps and 1 ms for FRT.

| Case | Expected result |
|---|---|
| Known-answer signal | Rise and settling both ≈ 1.16 s (first sample past 1.151 s) |
| vstep_case01 | Rise ≈ 1.20 s, settling ≈ 1.20 s → **Pass** |
| vstep_case02 | Rise ≈ 9.4 s → **Fail** (sluggish) |
| vstep_case03 | Rise ≈ 0.53 s but settling ≈ 6.4 s → **Fail** (oscillatory) |
| vstep_case04 (literal) | Settling ≈ 18 s → **Fail**, caused by noise, not the response |
| vstep_case04 (0.2 s centred average) | ≈ 1.16 s → Pass, slightly *earlier* than case 01 because the centred filter uses future samples |
| frt_case01 | Iq ≈ 30 ms, P recovery ≈ 50 ms → **Pass** |
| frt_case02 | Iq ≈ 55 ms → **Fail** |
| frt_case03 | P recovery ≈ 197 ms → **Fail** |

**Discussion points**
- The fault is *detected* at 1.002 s (the first sample below 0.85 pu), but the
  voltage starts falling at 1.000 s. The literal pre-fault window therefore
  includes two faulted samples, which lowers the pre-fault P slightly. A
  window ending at the true disturbance onset gives about 54 ms for case 01
  instead of 50 ms. Neither is "wrong", but the definition must say which.
- The same detection delay makes the Iq response time about 2 ms shorter than
  if it were measured from the true fault inception.
- Small definitional choices move results by a few percent. That doesn't matter
  for comfortable passes and fails, but it matters for **marginal** cases,
  which is exactly why the checker should flag them for an engineer.

The reference implementation is in the repo at
`scripts/m03_reference_solution.py`.
