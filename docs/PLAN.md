# applied-ai-course — Project Plan

A mobile-first, practical course in applied AI and agentic workflows for a
**grid connection team at a wind energy company working in Australia's National
Electricity Market (NEM)**. The end goal is a holistic **team efficiency
strategy** written by the team's leader.

MIT Professional Education's *Applied Agentic AI for Organizational
Transformation* is background inspiration only (an 8-module arc from foundations
to a capstone strategy). The content here is our own and specific to the domain.

> **Confidentiality rule.** The course never names the author's employer, real
> projects, customers, TNSP staff or any internal document. Every scenario uses
> a **fictional developer, wind farm and TNSP** with **synthetic data**. Public
> sources (the NER, AEMO and AEMC publications) may be cited. See `CLAUDE.md`.

---

## 1. Learner and team profile

| Topic | Detail |
|---|---|
| Learner | Head of a grid team; engineer who has used LLM APIs and coding assistants |
| Goal | Lead and decide: build a holistic efficiency strategy where AI and agentic workflows are a major theme |
| Team, half 1 | **Power system engineers**: model and study generator connections. About 95% of the effort is NEM work: NER clause 5.3 connection process, **Schedule 5.2** access standards / GPS, R1/R2 model validation, commissioning and ongoing compliance |
| Team, half 2 | **Grid leads**: technical project managers who run the customer interface and the interface with **TNSPs and AEMO** |
| Engineering tools | PSS/E, PSCAD, PowerFactory, Python automation |
| Work AI stack | VS Code + GitHub Copilot; allowed MCP tools: **Microsoft 365 / SharePoint**, **Atlassian (Jira / Confluence)** |
| Study habit | 10–20 min a day on an iPhone; weekly lab on the work laptop |
| Audience | **The leader first**, structured so engineer and grid lead tracks can be rolled out to the team later |

## 2. Design principles

1. **Built around the real work.** Every lesson starts from a task the team
   actually does, such as drafting a GPS negotiation position or answering an
   AEMO review comment, not from AI theory.
2. **Decision-first.** Lessons end with "what would you do, and what would you
   tell the team?"
3. **Phone for thinking, laptop for doing.** Micro-lessons, scenario quizzes
   and flashcards run on the phone. Labs run in VS Code + Copilot.
4. **Synthetic data only.** Labs ship with a fictional project pack: a
   fictional 300 MW wind farm, fictional GPS, synthetic step-response CSVs, a
   fictional AEMO/TNSP comment register and fictional meeting notes. Real
   network models (usually confidential TNSP information) are never used.
5. **Labs fit the sanctioned work stack.** No API keys and no admin rights.
   Labs use Copilot Chat and agent mode, custom instructions, prompt files, and
   the allowed M365 and Atlassian MCP tools. Simulation-tool labs work on
   exported results (CSV) or offer optional Python script stubs, so they run
   without licensed software.
6. **The engineer stays accountable.** AI output never goes into a submission
   unchecked. The course teaches verification patterns alongside productivity
   patterns, because regulatory submissions and registered-engineer obligations
   (e.g. RPEQ in Queensland) do not change.

## 3. The work map used throughout the course

The course uses one connection lifecycle as its spine and keeps coming back to it:

```
Enquiry → Application → Offer / GPS negotiation (5.3.4A) → Connection agreement
  → R1 package (models, DMAT, studies, reports) → AEMO/TNSP review cycles
  → Commissioning & hold points → R2 model validation
  → Ongoing compliance (rule 4.15) & alterations (5.3.9)
```

For each stage the course identifies:
**repetitive drafting**, **study and post-processing toil**, **review and
comment churn**, **coordination overhead**, and **knowledge loss between
projects**. These are the five places AI and agents can save time.

## 4. Curriculum: 8 modules, about 8 weeks

Each module has **5 micro-lessons**, a **scenario quiz**, **flashcards**,
**one laptop lab** and **one decision memo**.

| # | Module | Key ideas | Lab (VS Code + Copilot, synthetic data) |
|---|---|---|---|
| 1 | **AI foundations through a grid lens** | How LLMs work; why they confidently invent clause numbers and parameter values; context windows; workflows vs agents; what "agentic" really means | Ask Copilot to summarise S5.2.5.13 requirements from the public NER text, then from memory alone. Compare the two answers clause by clause. |
| 2 | **Mapping the team's work** | Value-stream mapping of the connection lifecycle; sizing the time spent per stage; scoring automation candidates by repeatability, risk, data access and value | Use Copilot to build a task inventory and scoring matrix from a synthetic timesheet and project list, then rank the top 10 opportunities. |
| 3 | **Copilot for study automation** (engineer focus) | Agent-assisted Python for batch studies and post-processing; encoding team conventions in custom instructions; automated GPS pass/fail checks such as rise and settling time, FRT and reactive power capability | From synthetic step-response and fault-ride-through CSVs, have Copilot agent mode build a checker against fictional GPS limits, with plots and a summary table. Review the code like a lead engineer would. |
| 4 | **Requirements, documents and knowledge** | Retrieval (RAG) explained simply; building traceability from NER clause to GPS to study to evidence; using SharePoint and Confluence through MCP; keeping knowledge between projects | Build a clause → requirement → evidence matrix for a fictional project, using prompt files plus M365/Confluence MCP against a sandbox space. |
| 5 | **Agentic workflows for grid leads** | Meeting notes → actions → Jira; AEMO/TNSP comment-response registers; status reporting; consistent customer correspondence; human approval steps | Process a fictional review round: classify 30 synthetic AEMO/TNSP comments, route them to owners, draft responses for review, and create Jira issues in a sandbox project through the Atlassian MCP tool. |
| 6 | **Verification, risk and accountability** | Hallucination controls (always cite the source clause, cross-check); prompt injection hidden in external documents; confidential network models and data classification; engineering sign-off; evals for engineering outputs | Build a 15-case eval set that checks clause citations and numerical claims in AI-drafted report text, and measure how a custom instruction changes the results. |
| 7 | **Governance and adoption** | A team AI usage standard; review gates aligned with submission hold points; skills and roles; change management with sceptical senior engineers; measuring impact (cycle time per stage, review rounds per submission, rework hours) | Draft a team AI usage standard, then turn it into Copilot custom instructions and a PR/report review checklist. |
| 8 | **Capstone: the team efficiency strategy** | A holistic strategy covering process, tooling, people and skills, governance, a roadmap (90 days and 12 months), metrics and a business case | Fill in the strategy template with a **fully synthetic worked example**. You write your real version at work in Copilot, not in this app (see section 6). |

### Later: team tracks (after the leader track)
- **Engineer track:** expanded modules 1, 3, 4 and 6, plus deeper study
  automation labs (PSS/E, PowerFactory and PSCAD scripting patterns, and
  R2 validation overlays with error metrics).
- **Grid lead track:** expanded modules 1, 2, 5 and 6, plus correspondence,
  negotiation preparation, stakeholder mapping and risk registers.

## 5. The app

**Form:** an installable web app (PWA) for iPhone, added to the home screen
from Safari. It works offline and saves progress on the device (IndexedDB),
with a manual JSON export as a backup.

**Screens:** Today (the next lesson and due flashcards) · Path (the 8 modules) ·
Lesson + Quiz · Review (spaced repetition) · Labs (read-only briefs and a
"done + notes" button) · Tutor · Settings.

**Stack:** Vite + TypeScript + Preact; content stored as Markdown/YAML in
`content/`; a service worker for offline use.

**Hosting:** **GitHub Pages** (free, because the repo is public), deployed by a
GitHub Action. The site and all course content are public, which is fine
because everything in it is generic and fictional. Your progress, notes and
memo drafts stay only on your phone and are never published.

**AI tutor (optional):** uses a personal Claude API key stored only on the
phone. Modes: explain differently, quiz me harder, Socratic follow-up, and
critique my memo as a sceptical AEMO reviewer, TNSP engineer or CFO. The
interface reminds you to use synthetic or generic content only.

## 6. Keeping company information out

- `CLAUDE.md` sets the rules for any AI agent working in this repo.
- **CI content guard:** a GitHub Action checks every push against a list of
  banned terms stored as an **encrypted repository secret**, so the banned
  names never appear in the repo.
- Capstone split: the app teaches the method and holds a synthetic example,
  and the real strategy is written in the work environment with work-approved tools.
- The tutor never receives real project or company data.
- **The repo and site are public.** Anything committed here can be read by
  anyone, which is another reason it holds only generic, fictional material.

## 7. Repo layout

```
applied-ai-course/
├─ content/
│  ├─ syllabus.yaml
│  ├─ m01-foundations/ … m08-capstone/
│  │  ├─ lessons/*.md   quiz.yaml   flashcards.yaml   lab.md   memo.md
│  └─ project-pack/    # fictional wind farm, GPS, comment registers, notes
├─ labs-sandbox/       # synthetic CSVs, script stubs, prompt files
├─ app/                # the PWA
├─ docs/PLAN.md
├─ CLAUDE.md
└─ .github/workflows/  # deploy + content guard
```

## 8. Build phases

| Phase | Deliverable | Done when |
|---|---|---|
| 0 | Scaffold, content schema, CI content guard, GitHub Pages deploy | Empty app installs on iPhone and opens offline |
| 1 | Today / Path / Lesson / Quiz; fictional project pack; **module 1 complete** | You can complete module 1 on the phone |
| 2 | Spaced repetition, progress, export/import; **module 2** | Daily loop works end to end |
| 3 | Labs view + `labs-sandbox` for modules 1–3 | Module 3 lab done on the work laptop |
| 4 | AI tutor | Memo critique works |
| 5 | Modules 4–8, each written one module ahead of your progress | Leader track complete |
| 6 | Engineer and grid lead tracks | Ready to pilot with 2–3 team members |

## 9. Open items

- Exact names of the allowed MCP tools, to confirm the lab steps in modules 4 and 5.
- NER and AEMO guideline versions: lessons cite clause numbers from the public
  versions current when written. The learner checks them against current
  versions, which is itself part of module 6.
