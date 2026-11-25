---
title: "Trusting the checker: known-answer tests"
minutes: 10
---

## Test the tool before trusting its results

If a checker says case 3 fails settling time, is the *response* wrong or is the
*checker* wrong? You can only answer that if the checker has been tested
against **signals where you already know the answer**.

## Known-answer signals

A first-order step response, `y(t) = 1 − e^(−t/τ)`, has exact answers:

- It reaches 90% of its change at **t = τ·ln(10) ≈ 2.303τ**.
- It never overshoots, so it settles within ±10% at the same moment.

With τ = 0.5 s, both rise time and settling time should be **1.151 s**.
Lab 3 includes this signal as `tests/known_first_order_tau0p5.csv`.

Run your checker on it. If it says 1.16 s, that's correct: with 10 ms
samples, the first sample past 90% is at 1.16 s. Knowing *why* the answer is
1.16 and not 1.151 is what makes you trust the tool.

Other useful known-answer signals:

| Signal | Tests |
|---|---|
| Second-order with known damping | Overshoot, oscillation, settling |
| A response that never settles | The "can't assess" path |
| A step in the other direction | Sign handling |
| The same signal at different sample rates | Sensitivity to sampling |

## Make the tests permanent

Copilot is good at writing tests. Ask for a test file (Python's built-in
`unittest` is enough) that runs every known-answer signal and checks the
results within a tolerance. Then:

- **Run the tests whenever the checker changes.** That catches regressions
  when someone "improves" it.
- **Keep the tests with the code** in version control.
- **Quote the test status in the study report**, e.g. "Checker v1.3, all 12
  known-answer tests pass". That is the evidence trail.

## Measured data is harder

Simulated signals are clean. Commissioning and R2 test data aren't. They have
noise, offsets and sometimes gaps. A literal settling check on noisy data can
fail a perfectly good response, because noise spikes poke out of the band.

Filtering fixes that, but **every filter changes the answer**. A centred
moving average, for example, uses future samples, so the response appears
slightly earlier than it really was. The choice of filter is an engineering
decision that must be **documented and applied consistently**, and ideally
agreed in the test plan before testing. Lab 3 lets you see this effect.

## What would you do?

Your checker passes all simulated cases, but on R2 test data it reports a
settling time of 18 s for a response that looks fine on the plot.

**What do you do: in the next hour, and as a permanent fix?**
