---
title: The study pipeline and where the hours go
minutes: 10
---

## Seven stages of a study run

Every study set, whether RMS in PSS/E or PowerFactory, EMT in PSCAD, or a DMAT
run, goes through the same pipeline:

| # | Stage | What happens | Scriptable? |
|---|---|---|---|
| 1 | **Define cases** | Which disturbances, operating points, network conditions | Partly: the case list can be data |
| 2 | **Set up** | Load models, set initial conditions, apply case parameters | Yes, through the tool's scripting interface |
| 3 | **Run** | Execute the simulations | Yes, batch runs |
| 4 | **Extract** | Export channels to files | Yes |
| 5 | **Post-process** | Plots, derived quantities, tables | Yes, and this is where much of the toil is |
| 6 | **Assess** | Compare against GPS criteria: pass, fail or marginal | Mostly; borderline cases need an engineer |
| 7 | **Report** | Figures, tables and narrative into the study report | Figures and tables yes; narrative partly |

Lab 2's fictional timesheets showed **plotting, set-up and report drafting**
as the biggest engineering costs. That's stages 2, 5 and 7. Running the
simulation itself is rarely the bottleneck. Moving data around it is.

## The tools already have the hooks

The main simulation tools all have Python interfaces:

- **PSS/E:** Python API (`psspy`) for case setup, dynamics runs and channel output.
- **PowerFactory:** Python scripting (the `powerfactory` module) for studies,
  results and export.
- **PSCAD:** an automation library for running projects and cases from Python.

Exact module names and capabilities vary by version; check your installation's
documentation. The point for this module: **your engineers can already script
stages 2–6**. Many have half-finished personal scripts doing exactly that.

## What Copilot changes

Copilot doesn't run your simulations. It changes **how fast an engineer can
write and maintain the scripts around them**:

- An engineer who "isn't really a programmer" can describe a plot set in plain
  English and get working code to review.
- Tidying a personal script into something the team can share becomes hours,
  not weeks.
- Checks that were done by eye (reading a rise time off a plot) become code
  that runs on every case, every time.

## The licence and data caveat

Simulation tools are licensed software on controlled machines, and network
models from TNSPs are usually **confidential**. The safe pattern is:

- Copilot helps write the **script**.
- The script runs **locally**, against the models.
- Model files and confidential data **are not pasted into the chat**.

That's also why this module's lab uses exported, synthetic CSVs. It needs no
licence and no real model.

## What would you do?

Tom spends four days per study re-run. Using the seven stages, **estimate
roughly where those four days go, and which two stages you'd script first**.
