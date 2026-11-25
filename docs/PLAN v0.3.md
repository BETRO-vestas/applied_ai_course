# copilot-leaders-course — Project Plan (DRAFT v0.3)

A mobile-first, practical course in **effective M365 Copilot use for managers
and heads of department** who lead teams of engineers. The end goal is a
working **"Third Brain"**: a project memory retrieval workflow (prompts, a
notebook and an agent) adapted to each learner's own team.

The course also serves as the **tailored M365 Copilot Premium onboarding** for
the author's leadership group. Everything connecting the course to that
organisation (licences, tracking, reporting, internal links) is handled
**outside the repo**, through the kick-off session and the invitation email.

**Public-by-default rule.** The course is hosted on **public GitHub Pages**.
Everything in the repo and app is assumed to be public. All content is
**fictional but generically realistic**. It never names the author's employer,
real projects, customers, network operators, colleagues, internal tools,
internal agents, internal policies or internal URLs. The rules for AI agents
and contributors are in `.github/copilot-instructions.md`.

It reuses the framework of `applied-ai-course` (PWA, micro-lessons, scenario
quizzes, flashcards, a weekly lab and a decision memo per module). The content,
audience and toolset are new.

**Tool rule.** Learners use **M365 Copilot only**. Nothing in the learner path
assumes VS Code, GitHub Copilot, Copilot Studio, Power Automate, APIs or admin
rights. VS Code and GitHub Copilot are used by the *author* to build the
course, not by learners.

---

## 1. Learner and team profile

| Topic | Detail |
|---|---|
| Learners (wave 1) | Heads of engineering departments in a regional technology leadership team (grid, electrical design, SCADA and cyber, siting, product integrity, lifecycle engineering, technical sales) |
| Learners (wave 2) | All team members in those departments, once Premium licences are rolled out |
| Prior knowledge | Basic M365 Copilot: has opened Copilot Chat and asked simple questions. No prompting technique and no agents |
| Goal | Use Copilot with confidence and judgement, then **design and build a Third Brain for their own team** |
| Not the goal | Coding, developer tooling, Copilot Studio builds, or managing developers |
| Licences | **Premium is the target state.** Some learners will start on Copilot Chat. Every lab has a Chat-only path until their licence arrives |
| Study habit | About 10 min a day on a phone, plus one 30–45 min lab a week on the work laptop |
| Delivery | Modules 1–2 self-paced (mandatory) → live kick-off → Modules 3–8 self-paced → capstone show-and-tell |

---

## 2. Design principles

- **Built around a manager's real week.** Every lesson starts from something a
  manager actually does: finding what was decided, preparing a handover,
  briefing a boss, or answering "what did we commit to?".
- **Decision-first.** Lessons end with "What would you do, and what would you
  tell your team?"
- **Phone for thinking, laptop for doing.** Lessons, quizzes and flashcards
  are done on the phone. Labs are done in the M365 Copilot app, Outlook, Teams,
  Word and SharePoint.
- **Premium-first, Chat-ready.** Lessons teach the Premium experience. Each
  lab marks Premium-only steps 🔒 and gives a Chat-only alternative, so no
  learner is blocked.
- **Retrieval is only as good as what was written down.** The course treats
  information habits (decision logs, meeting naming, transcripts, file
  structure, metadata) as a *leadership* lever, not an IT problem.
- **The manager stays accountable.** Copilot finds and drafts. A person checks
  the answer against the source before anyone relies on it. Every productivity
  pattern is taught together with a way to check it.
- **Synthetic data for practice, real data for the capstone.** Labs use the
  fictional project pack. The capstone is built on the learner's own team data
  in their work environment, following their company AI policy. Nothing real
  ever comes back into the repo or app.
- **Start simple, then add tools when needed.** The order is Chat → saved
  prompts → Notebook → Agent Builder agent. Copilot Studio is only named as the
  next step for teams that outgrow Agent Builder. It is a separate business case
  with separate costs.
- **Point to official sources.** Lessons link only to public Microsoft
  documentation and Microsoft Learn. Where an organisation-specific resource is
  needed (AI policy, knowledge checks, approved tools), the lesson says
  *"check your organisation's …"*. The facilitator supplies the real links at
  the kick-off.

---

## 3. The common thread: the project memory loop

Every lesson returns to one loop, applied to one fictional project as it moves
between three workstreams:

```
CAPTURE → ORGANISE → RETRIEVE → VERIFY → HAND OVER → REUSE
   ↑                                                    |
   └────────────────────────────────────────────────────┘

Connections stream ──handover──▶ Compliance stream ──handover──▶ Service stream
```

| Stage | Typical pain | Copilot pattern taught |
|---|---|---|
| Capture | Decisions live in someone's inbox or head | Meeting recap, transcripts, "decision log" prompts |
| Organise | Files are scattered and names are inconsistent | Notebooks, SharePoint structure, naming and metadata |
| Retrieve | "When did we agree that, and with whom?" | Grounded prompts across mail, Teams, files and meetings |
| Verify | Confident answers that are wrong or incomplete | Citations, "say not found" instructions, open the source |
| Hand over | The new lead starts with no context and commitments get lost | Handover pack prompt and agent |
| Reuse | The same lesson is relearned on the next project | Lessons-learned retrieval across projects |

**Translating to non-Grid teams.** Each module has a short sidebar that maps the
pattern to other departments. Examples: an Electrical BoP design-freeze
handover, a SCADA cyber exception log, a Siting assessment assumption history,
a Product Integrity issue lineage, a Lifecycle Engineering retrofit decision,
and a Technical Sales bid-to-project handover.

---

## 4. Fictional context (project pack)

All names below are invented. Any resemblance to real organisations, projects
or people is unintended. Before publishing, check each name with a web search
to avoid an accidental match with a real wind farm or company. Technical
content (connection processes, compliance testing, hold points, model
packages) is described **generically**, using public, market-neutral
terminology.

| Item | Fictional name | Notes |
|---|---|---|
| Company | **Northwind Renewables** | Fictional turbine supplier with a regional technology function |
| Team | **Grid Delivery team (fictional)** | About 12 engineers and leads |
| Head of department | **Alex Morgan** | The learner's stand-in |
| Grid Lead, Connections | **Priya Nair** | Owns the project up to the connection agreement |
| Grid Lead, Compliance | **Tom Hale** | Owns model packages, testing and hold points |
| Grid Lead, Service | **Mei Chen** | Owns ongoing compliance after handover |
| Power system engineer | **Sam Okafor** | Studies and model work |
| Project | **Coral Ridge Wind Farm**, 250 MW | Fictional site |
| Customer | **Brolga Energy** | Fictional developer |
| Network operator | **SouthGrid Networks** | Fictional transmission network operator |
| Market operator | "the market operator" | Kept generic; no real market or rule clauses |

**Synthetic artefacts**, stored as Word/PDF files on SharePoint (see section 6):

- 18 months of meeting notes and recaps (internal, customer and network operator)
- Email threads exported as documents (commitments, a scope dispute, a changed decision)
- Teams chat excerpts exported as documents
- A partial decision log. It is incomplete on purpose: some decisions exist only in emails
- A handover checklist and a messy handover note from Priya to Tom
- A contract scope extract with one ambiguous clause
- **Planted traps:** a decision that was later reversed, two documents that
  contradict each other, a file with an out-of-date title, and one document with
  a hidden instruction inside it (to teach awareness of prompt injection)

The data is generated by a seeded, standard-library script
(`scripts/generate_project_pack.py`) so it can be reproduced.

---

## 5. Curriculum: 8 modules, about 8 weeks

Each module has **4 micro-lessons** (about 8 min each), a **scenario quiz**,
**flashcards**, **one lab** (30–45 min) and **one short memo**.

| # | Module | Key ideas | Lab (synthetic data) |
|---|---|---|---|
| 1 | **Foundations: how M365 Copilot works** ⭐ *mandatory pre-work* | Grounding (Work vs Web); Copilot only sees what *you* can see; Copilot Chat vs Premium; where Copilot appears (app, Outlook, Teams, Word); why it sounds confident when it is wrong; what a company AI policy typically covers. **Final step: complete your organisation's mandatory Copilot knowledge checks** (link given in the invitation, not in the app) | Ask the same Coral Ridge question three ways: ungrounded, web-grounded, and grounded on the project pack. Compare accuracy and find the invented detail |
| 2 | **Prompting chat well** ⭐ *mandatory pre-work* | Goal, context, source and expectations; referencing files, people and meetings with `/`; refining instead of starting over; asking for citations and "say not found"; saving and sharing prompts in the prompt gallery | Rewrite three weak prompts from Alex's week. Score them before and after. Save the best one to your prompt gallery |
| — | **Live kick-off (60 min)** | See section 7 | — |
| 3 | **Retrieval: finding decisions and commitments** | How search over mail, Teams, files and meetings works; bias towards recent and highly ranked results; partial results; meeting recap vs transcript; the "open the source" rule | Answer five "what did we decide or promise?" questions on Coral Ridge. Find the reversed decision and the contradiction. Record which answers were complete, partial or wrong |
| 4 | **Handovers with Copilot** | Handover as a retrieval product; handover pack template (decisions, commitments, open risks, stakeholders, file locations); Connections → Compliance → Service | Generate Priya's handover pack for Tom. Compare it with her original note: what did Copilot find that she missed, and what did it miss? |
| 5 | **Notebooks and curated memory** | Copilot Notebooks and Pages; curating sources vs searching everything; when a notebook beats an agent; shared notebooks across licence types | Build a Coral Ridge notebook, then run the Module 3 questions again. Compare accuracy |
| 6 | **Building agents with Agent Builder** 🔒 | An agent is instructions + knowledge + starter prompts; writing instructions like a job description; setting the knowledge scope; testing against known answers; sharing and licence limits; SharePoint agents; when to move to Copilot Studio; take apart a fictional example agent ("Northwind Technical Writing Reviewer") | Build a "Coral Ridge Memory" agent on the training SharePoint folder. Test it with a 10-question answer key. Improve the instructions once and test again. *Chat-only path: build the same design as a Notebook plus a saved instruction prompt* |
| 7 | **Information habits and verification as leadership** | Team habits feed the Third Brain: decision logs, meeting naming, transcription, file structure and metadata; verification and sign-off; prompt injection in external documents; what must never go into Copilot | Draft a one-page "team memory charter" for the Grid Delivery team, then turn it into the agent's instructions |
| 8 | **Capstone: your team's Third Brain** | Choose the use case; measure today's time spent; design capture → retrieve → hand over; build; measure; roll out to the team | Complete the capstone template using the synthetic worked example, then build your real version at work (section 8) |

---

## 6. Labs: tools, licences and data

**Sanctioned learner tools:** M365 Copilot app (Chat), Copilot in Outlook,
Teams, Word and PowerPoint, Copilot Notebooks, Agent Builder and SharePoint
agents.
**Not used:** VS Code, GitHub Copilot, Copilot Studio, Power Automate and
third-party AI tools.

**Licence paths.** Every lab states:

- **Premium path** (default): uses work grounding across mail, Teams, meetings
  and files, Copilot in the apps, and Agent Builder.
- **Chat-only path** 🔒 fallback: uses uploaded or referenced files from the
  training folder and Notebooks with standard sources. It also covers designing
  (not deploying) the agent.
- **Sharing note:** agents shared with colleagues who do not have Premium can
  create consumption costs. The capstone recommends sharing only with Premium
  holders until the licence rollout is complete.

Capability differences between licences are checked against current public
Microsoft documentation when each lab is written. Each lab carries a "last
checked" date because the features change often.

**Where the synthetic data lives.** The project pack is generated into the
public repo and can be downloaded from the app as a zip. Copilot can only
retrieve what sits in M365, so learners:

1. **Default:** use the training folder that the facilitator places on the
   organisation's SharePoint, with the same public-safe files. The link is
   shared at the kick-off and invitation, not in the app.
2. **Fallback:** download the zip from the app, upload it to their own
   OneDrive, and reference or attach the files in chat.

**Retrieval limitation to teach honestly.** Synthetic "emails" and "chats"
stored as documents behave like files, not like real mail or Teams messages.
Module 3 states this clearly and adds a short optional exercise on the
learner's **own** mailbox and Teams, using a safe, low-stakes question.

**Lab structure** is unchanged from the original course: where to work and what
you need → setup → Parts A–D with time estimates (at least one "compare two
approaches") → reflect (3 questions) → what to do if something isn't available.

---

## 7. Live kick-off session (after Modules 1–2)

| Block | Minutes | Content |
|---|---|---|
| Why we're doing this | 10 | Business case, the Third Brain goal, how this replaces external onboarding |
| Licence and readiness check | 5 | Who has Premium, knowledge checks done, access to the training folder |
| Live demo | 20 | One grounded retrieval prompt on Coral Ridge, a handover pack, then a real internal agent example (shown live only; not stored in the repo) |
| Tips and pitfalls | 15 | Common mistakes, the "open the source" habit, prompt gallery |
| Commitments | 10 | Each person names one recurring "where did we decide that?" problem for their capstone |

The kick-off slides and any organisation-specific material are kept **outside
the public repo**. The repo holds only a generic session outline and the demo
prompts used on the fictional data.

---

## 8. Capstone: the Third Brain

**What each learner delivers:**

1. **Use case and baseline:** the recurring retrieval or handover problem, who
   has it, and roughly how many hours a month it costs today.
2. **Prompt pack:** 5–8 saved prompts for the team (decision finder,
   commitment tracker, handover pack, stakeholder history, lessons learned).
3. **Agent or notebook:** built in Agent Builder (or a Notebook on Chat-only),
   with instructions, a defined knowledge scope and a 10-question test set with
   known answers.
4. **Team memory charter:** the 5–7 information habits the team commits to.
5. **Measure and roll-out:** the success measure, the main risk, and a
   two-sentence message to the team.

The app holds the method and the synthetic Coral Ridge worked example. The real
Third Brain is built at work on real team data and stays in M365.

**Show-and-tell (30–45 min):** peers demo their Third Brains. The results feed
the 3-month adoption report.

---

## 9. Onboarding and adoption reporting (outside the repo)

This section describes how the facilitator runs the course at work. None of
the forms, lists, reports or names it mentions are stored in the repo or app.
The course doubles as the licence onboarding, so it must produce the promised
evidence:

- **Before a licence is assigned:** both mandatory knowledge checks are
  completed (Module 1).
- **Completion tracking:** for each learner, Modules 1–2 done before the
  kick-off, modules completed, and capstone delivered. A Microsoft Form or a
  SharePoint list is filled in at the end of each module, because app progress
  stays on the device.
- **At 3 months:** adoption and value reported in the organisation's standard
  follow-up format. This covers hours saved on retrieval and
  handovers (capstone baseline vs after), Third Brains in active use, and
  learner feedback.

---

## 10. The app and hosting

The app is the same as `applied-ai-course`: an installable PWA (Vite +
TypeScript + Preact) that works offline and keeps progress on the device, with
JSON export.

**Screens:** Today · Path · Lesson + Quiz · Cards · Labs · Project · Prompt
Library (new) · Settings.

- **Prompt Library:** copy-ready prompts from each module, with a copy button.
- **Premium badges:** 🔒 markers on lab steps that need Premium.
- **AI tutor:** remains M365 Copilot, outside the app. It supports "explain
  differently", "quiz me harder", and "critique my capstone as a sceptical CFO,
  a new Grid Lead or a customer".

**Hosting: public GitHub Pages.** This gives the installable, offline,
mobile "app" feel with no infrastructure to run. The trade-off is that the
whole repo and site are public.

**Content rules (strict, because everything is public):**

- **Never in the repo or app:** the employer's name, real projects,
  customers, network or market operators' correspondence, colleagues' names,
  internal tools or agents, internal policies, internal URLs or SharePoint
  links, licence or cost figures, and any screenshot of a real tenant.
- **Allowed:** fictional Northwind/Coral Ridge content, generic
  engineering-management scenarios, public Microsoft documentation links, and
  generic Copilot prompts.
- **Organisation-specific material** (policy links, knowledge checks, the
  SharePoint training folder, the tracking form, kick-off slides) is shared only
  through work channels.
- **CI content guard:** the banned-terms list (employer, real project and
  customer names, internal domains) is stored as an encrypted repository
  secret. Every push is scanned, and a match fails the build.
- **Review before publish:** before each module goes live, a human reads it
  with the question "would I be comfortable if a customer read this?"
- **Do not track learners:** the app has no analytics and no sign-in.
  Progress stays on the device.

---

## 11. Repo layout

```
copilot-leaders-course/
├─ content/
│  ├─ syllabus.yaml
│  ├─ m01-foundations/ … m08-capstone/
│  │  ├─ lessons/*.md   quiz.yaml   flashcards.yaml   lab.md   memo.md
│  ├─ prompts/              # prompt library (YAML)
│  ├─ kickoff/              # generic outline + demo prompts only
│  └─ project-pack/         # Coral Ridge context, people, artefacts
├─ labs-sandbox/            # public-safe synthetic files (zip download in app)
├─ scripts/generate_project_pack.py
├─ app/
├─ docs/PLAN.md
└─ .github/
   ├─ copilot-instructions.md
   └─ workflows/            # GitHub Pages deploy + content guard
```

---

## 12. Build phases

| Phase | Deliverable | Done when | Status |
|---|---|---|---|
| 0 | Copy the repo, rename, rewrite the rules, content guard, deploy to GitHub Pages | Empty app installs on a phone and opens offline | |
| 1 | Public-safe project pack (names checked) + **Modules 1–2 complete** | A peer can finish M1–M2 in about 90 min total | |
| 2 | Kick-off pack + completion tracking form | Kick-off delivered; all peers past M2 | |
| 3 | Prompt Library + Modules 3–4 | First peer completes the M4 handover lab | |
| 4 | Modules 5–6 (Chat-only and Premium paths) | First agent built on the training folder | |
| 5 | Modules 7–8 + capstone template and worked example | First real Third Brain demoed | |
| 6 | Show-and-tell + 3-month adoption report (outside the repo) | Report delivered | |
| 7 | Wave 2: adapted version for all team members in the organisation | Ready to roll out as Premium licences land | |

Write one module ahead of the fastest learner.

---

## 13. Success measures

- 100% of wave 1 learners complete Modules 1–2 and both knowledge checks before the kick-off
- At least 80% complete the capstone within 10 weeks of the kick-off
- Hours saved per month on retrieval and handovers (capstone baseline vs 3 months later)
- Number of Third Brains in active use by teams at 3 months

---

## 14. Open items

- Check the fictional names (company, wind farm, customer, operator) with a web search for accidental matches.
- Confirm current Chat vs Premium capabilities (work grounding, Agent Builder,
  Notebook sources) against public Microsoft docs before writing Modules 3–6.
- Choose the completion-tracking method (Form or SharePoint list), kept outside the repo.
- Upload the training SharePoint folder (a copy of the public-safe pack) and share it read-only.
- Fill in the banned-terms secret before the first push.
- Optional: decide whether to state publicly that the site is unofficial and not affiliated with any employer.
