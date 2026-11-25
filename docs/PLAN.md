# M365 Copilot for Leaders: course plan

The full design is in [PLAN v0.3.md](./PLAN%20v0.3.md). This file records the
course frame and the build status.

## Course frame

1. **Learner and goal.** Heads of engineering departments who already use
   Copilot Chat a little. By the end they can use M365 Copilot with judgement
   and build a project memory ("Third Brain") for their own team.
2. **Spine.** The project memory loop: capture decisions and commitments, retrieve
   them, hand them over, and check the source before relying on them. Every
   module returns to it through the fictional Coral Ridge Wind Farm project.
3. **Shape.** 8 modules of about 1 week each. Each has 4 lessons (about 8 minutes),
   a scenario quiz, flashcards, one lab and one memo.
4. **Time budget.** About 10 minutes a day on a phone, plus one 30 to 45 minute
   lab a week on a laptop.
5. **Fictional context.** Northwind Renewables, Coral Ridge Wind Farm, Brolga
   Energy, SouthGrid Networks and Kestrel Controls, plus the people in
   `content/project-pack/`. Use these names in every module.
6. **Sanctioned tools.** M365 Copilot (Chat and Premium), Outlook, Teams, Word and
   SharePoint. Labs must run without VS Code, API keys, admin rights or licensed
   simulation software.
7. **Data and confidentiality.** Synthetic data only, public content, and no
   real employer, customer, network operator or person. A CI content guard checks
   for banned terms.

## Modules

| # | Module | Folder |
|---|---|---|
| 1 | Foundations: how M365 Copilot works | `content/m01-foundations/` |
| 2 | Prompting chat well | `content/m02-prompting/` |
| 3 | Retrieval: finding decisions and commitments | `content/m03-retrieval/` |
| 4 | Handovers with Copilot | `content/m04-handovers/` |
| 5 | Notebooks and curated memory | `content/m05-notebooks/` |
| 6 | Building agents with Agent Builder | `content/m06-agents/` |
| 7 | Information habits and verification as leadership | `content/m07-habits/` |
| 8 | Capstone: your team's Third Brain | `content/m08-capstone/` |

Status is set in `content/syllabus.yaml`. Modules 1 and 2 are `available`. The
rest are `coming` until their content is ready.

## Build phases

0. Scaffold, content format, content guard and deploy.
1. Today, Path, Lesson and Quiz, with the project pack and module 1.
2. Spaced repetition, progress and export/import, with module 2.
3. Labs view and the lab files for the early modules.
4. Memo support, then the remaining modules.
5. Each module is written about one ahead of the learner's progress.

## Checks before a module is released

Before a module is marked `available`: lessons have a title, minutes and a "What
would you do?" ending; quiz answers are in range; card fronts are unique; the lab
and memo exist; there are no real names or data; and `npm run build` passes.
