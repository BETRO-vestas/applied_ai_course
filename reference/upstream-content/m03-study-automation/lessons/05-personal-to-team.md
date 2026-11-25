---
title: From personal scripts to a team toolkit
minutes: 10
---

## The hidden script problem

Most grid teams already have automation. It's just **personal**: Mei's
plotting script, Raj's DMAT post-processor, Elena's test-data loader. Each
works for its owner, isn't documented, and leaves with them.

Copilot makes writing scripts much faster, so without a plan you'll get
**more** personal scripts, faster. The leadership opportunity is to turn this
into a shared toolkit.

## What a team toolkit needs

| Element | Minimum version |
|---|---|
| **One repository** | A Git repo the team can reach (your org's GitHub, or equivalent) |
| **Custom instructions** | `.github/copilot-instructions.md` with team conventions |
| **Criteria as data** | One criteria file per project GPS |
| **Known-answer tests** | Run before every change is merged |
| **Review** | Every change reviewed by a second engineer, the same as a study |
| **An owner** | One named person, with time allocated, not "whoever has a spare hour" |
| **A version number** | Quoted in study reports |

## Rolling it out

1. **Start with post-processing** (plots and tables): high toil, low risk,
   easy to check against existing reports.
2. **Add the GPS checks** with known-answer tests.
3. **Move into setup and batch runs** once the team trusts the toolkit.
4. **Then report assembly**: figures and tables dropped into the report template.

Run the first stage as a pilot on one project and compare hours with the
baseline from module 2.

## People, not just code

- **Tom** gains most from automation and should help build it, which is good
  development for a graduate.
- **Raj** is your quality gate: involve him in setting the review rules rather
  than trying to get round him.
- **Engineers who don't code** benefit most from Copilot. Pair them with
  someone who does for the first few weeks.
- **Recognition:** contributing to the toolkit should count as real work in
  objectives and time allocation.

## Guardrails to write down

- Copilot use follows your organisation's AI policy and approved tools.
- No confidential model files or TNSP data in prompts.
- All toolkit code is reviewed. "AI-written" is not a reason to skip review.
- The engineer who signs the study owns the results, whatever wrote the script.

## What would you do?

**Who would you make the owner of the toolkit, how much of their time would you
allocate, and what would you take off their plate to make room?**
