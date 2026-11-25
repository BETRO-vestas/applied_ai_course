# Content Reference

Combined extract of all Markdown files from `reference/upstream-content/`
(source: https://github.com/btrowlinson/applied-ai-course, `content/` folder).
Reference only. Each section below keeps the original file text and is headed
by its original path.

---

# File: m01-foundations/lessons/01-plausible-not-validated.md

```yaml
title: A plausible model, not a validated one
minutes: 10
```

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

---

# File: m01-foundations/lessons/02-context-is-everything.md

```yaml
title: "Context: give it the clause, don't ask it to remember"
minutes: 10
```

## The context window

Everything a model can "see" when it answers is called its **context**. This
includes your question, the conversation so far, any files or text you attach,
and any instructions set up in the background. The space for all of that is the
**context window**.

Modern context windows are large, room for hundreds of pages of text. But two
practical limits remain:

1. **Only what's in the window counts.** If the current version of S5.2.5.13 is
   not in the context, the model falls back on memory.
2. **More isn't always better.** Burying the key paragraph in 400 pages of
   attachments makes it easier for the model to miss or mix things up.
   Focused, relevant context beats a dump of everything.

## Grounding

**Grounding** means making the model answer *from material you supply* rather
than from memory. It is the single most effective habit for engineering use.

Compare two prompts:

> **Ungrounded:** "Summarise the NER requirements for voltage control
> settling time."

> **Grounded:** "Using only the attached text of NER S5.2.5.13 (version
> number noted at the top of the file), list each requirement relating to
> settling time. Quote the sentence each one comes from. If the text doesn't
> say, write 'not stated'."

The grounded prompt does four things:

- **Supplies the source.** The model reads the text instead of recalling it.
- **Restricts it to that source** ("using only").
- **Asks for evidence** (a quote per claim), which makes checking fast.
- **Allows "not stated"**, so the model doesn't have to fill a gap by inventing
  something.

## Context in GitHub Copilot

In VS Code, Copilot Chat builds its context from:

- **Your prompt** and the chat history.
- **Files you reference**, for example `#file` or by attaching them. You choose
  what it reads.
- **The workspace**, such as open editors and, when asked, a search of the
  project.
- **Custom instructions**: a file in the repository
  (`.github/copilot-instructions.md`) that is quietly added to every request.
  Think of it as a team standing brief. Module 3 builds one.
- **Tools.** In agent mode, Copilot can read files, run commands and use
  approved MCP tools (for you, Microsoft 365 / SharePoint and Atlassian) to
  *fetch* context itself.

## Retrieval: grounding at scale

When the material is too large to attach by hand (every past project's comment
register, the full set of AEMO guidelines), systems use **retrieval**. They
search a document store for the most relevant passages and put only those in
the context. You'll see this called **RAG** (retrieval-augmented generation).
Module 4 covers it properly. For now, know that it is grounding, automated, and
only as good as the documents behind it.

## A useful mental model

Treat the model like a **very fast, very well-read contractor on their first
day**. They are capable, but they don't know your project, your GPS or which
version of the guideline applies. You wouldn't ask a new contractor to quote
the GPS from memory. You'd hand them the agreement.

## What would you do?

Aisha wants to use Copilot to draft first-pass responses to the 46 open round 2
comments on Larkspur Downs.

**What context would you insist the assistant is given for each response, and
what would you deliberately keep *out* of the context?**

---

# File: m01-foundations/lessons/03-where-it-breaks.md

```yaml
title: Where it breaks in engineering work
minutes: 12
```

## A failure catalogue for a grid team

You don't need to fear AI output; you need to know **where to look**. These
are the failure modes that matter most for connection work, roughly in order of
risk.

### 1. Invented specifics

Clause numbers, parameter values, guideline section names, dates of rule
changes. They are fluent, formatted correctly and sometimes wrong. **Check every
specific against a source**, ideally one the model was told to quote.

### 2. Stale knowledge

The model may describe an older version of a clause or a superseded AEMO
guideline with full confidence. **Always tell it which version applies and give
it that text.**

### 3. Silent scope drift

Asked to "summarise the TNSP's comment", it may also *resolve* the comment by
proposing a fix you never asked for. Ask for one thing at a time. Say what is
out of scope.

### 4. Numbers and units

Per-unit vs MVA bases, ms vs s, MW vs MVAr. Models are better at arithmetic
than they used to be, but a slip in a base conversion is easy to miss.
**Have the AI write code to do the calculation**, then check the code and
its result. Don't accept a figure it worked out in its head.

### 5. Agreeable answers

Ask "this response is compliant, isn't it?" and you'll often get yes. Ask
neutrally, or ask it to **argue the other side**: "You are the AEMO reviewer.
List the strongest objections to this response."

### 6. Confident tone, everywhere

The tone doesn't change between a well-supported statement and a guess. Don't
read confidence from style. Read it from **evidence**: quotes, references,
runnable code.

## Verification patterns that scale

You can't check everything line by line. That would wipe out the gain. Use
patterns that make checking cheap:

| Pattern | How | Good for |
|---|---|---|
| **Quote-backed claims** | Every claim must quote its source sentence | Requirements, comment responses |
| **"Not stated" allowed** | Explicitly allow gaps | Extracting from documents |
| **Code, not mental maths** | AI writes the script, you check the script | Study post-processing, calculations |
| **Adversarial review** | Second pass as the reviewer or a sceptic | Draft submissions and memos |
| **Spot-check by risk** | Check 100% of clause references and values, sample the prose | Long reports |
| **Two-person rule** | AI draft → engineer checks → second engineer approves | Anything that goes to AEMO or the TNSP |

## Accountability doesn't move

Whoever signs the study report or the comment response owns it, however it was
drafted. Where professional registration applies (for example RPEQ for
professional engineering services in Queensland), the obligation is the same.
**AI changes how the work is produced, not who is responsible for it.** Your
team AI standard (module 7) will put this in writing.

## What would you do?

Mei says: "If I have to check everything the AI writes, it isn't saving me
time."

**Using the table above, how do you answer her for (a) a study report and (b)
a round of comment responses? Where is checking cheap, and where does it stay
expensive?**

---

# File: m01-foundations/lessons/04-chat-to-agents.md

```yaml
title: From chat to agents
minutes: 10
```

## Three levels

| Level | What the AI does | Example in your world |
|---|---|---|
| **Chat** | Answers in text; you copy and paste | "Explain what a DMAT checks." |
| **Workflow** | Runs fixed steps that **you** designed; the AI fills in steps | Each comment → classify → find related clause → draft response → human review |
| **Agent** | Given a goal and tools, it **decides its own steps**, acts, checks results and repeats | "Update the plotting script so all figures match the new report template, then run it and fix any errors." |

The defining feature of an **agent** is the **loop**:

```
goal → plan → use a tool → look at the result → decide the next step → … → done
```

**Tools** are what make it an agent rather than a chatbot. A tool might read a
file, run a Python script, search SharePoint, or create a Jira issue. Each
tool use is an *action* that has an effect.

## Workflows vs agents: the key design choice

| | Workflow | Agent |
|---|---|---|
| Predictability | High: same steps every time | Lower: it picks the path |
| Auditability | Easy: every step is known | Needs logs and review |
| Good when | The process is well understood and repeated | The path varies or needs judgement |
| Grid example | Comment register processing | Debugging a broken study script |

For a regulated, audited process, **start with workflows**. Use agents where
the path genuinely varies and the result is easy to check, such as code.
Many good systems are mostly workflow with a small agent step inside.

## MCP: how tools are plugged in

**MCP (Model Context Protocol)** is an open standard for connecting AI
assistants to tools and data sources. An MCP server exposes things like "search
documents" or "create issue", and any compatible assistant can use them.

Your company allows a small number of MCP tools in Copilot, including
Microsoft 365 / SharePoint and Atlassian (Jira / Confluence). That means an
agent could, with your approval, *find* the TNSP's latest comment letter in
SharePoint or *create* the Jira tasks for a review round. Module 4 and module 5
use this.

## Copilot's modes

In VS Code Copilot Chat you'll see modes such as:

- **Ask:** chat about your code or files. It doesn't change anything.
- **Edit:** proposes edits to files you choose; you accept or reject them.
- **Agent:** works through a multi-step task. It can read files, create and
  edit them, run terminal commands and call tools, and asks permission for
  actions with side effects.

The exact names and options change between versions, but the levels map
directly to the table above. The lab this week has you watch each mode work
on the same task.

## What would you do?

For Larkspur Downs, list three tasks you'd give **chat**, three you'd build as
a **workflow**, and one you'd let an **agent** try.

**For the agent task, what tools would it need, and which actions must it ask
permission for?**

---

# File: m01-foundations/lessons/05-autonomy-ladder.md

```yaml
title: The autonomy ladder for a grid team
minutes: 12
```

## A ladder, not a switch

"Should we use AI agents?" is the wrong question. The useful question is
**how much autonomy, for which task, with which checks?**

| Rung | Name | AI role | Human role | Example |
|---|---|---|---|---|
| 0 | **None** | — | Does the work | Signing off the GPS compliance report |
| 1 | **Assist** | Explains, answers questions | Does the work | "What does this AEMO comment mean?" |
| 2 | **Draft** | Produces a first version | Reviews and edits everything | First-pass comment responses |
| 3 | **Do, then review** | Completes a bounded task | Checks the result before it is used | Generating study plots and summary tables |
| 4 | **Do, review samples** | Runs a repeated task | Spot-checks and handles exceptions | Formatting and filing study outputs |
| 5 | **Autonomous** | Acts without review | Monitors outcomes | Rarely appropriate for regulatory work |

## Placing a task on the ladder

Four questions decide the right rung:

1. **Consequence of an error.** Would a mistake reach AEMO or the TNSP, change
   a GPS, or delay energisation? → Lower rung.
2. **Ease of checking.** Can a person verify the result faster than doing the
   work? (A plot against source data: yes. A subtle argument in a negotiation
   letter: harder.) → Easy checking allows a higher rung.
3. **Repetition.** Done every week on every project? → Worth investing to move
   it up the ladder.
4. **Data sensitivity.** Does it touch confidential TNSP network models or
   commercial terms? → Only sanctioned tools, and a lower rung.

## Where the team's time probably goes

From the Larkspur Downs snapshot:

- Tom: **4 days per study re-run**, mostly setup, export, plotting and
  formatting. That is repeated, easy to check and low consequence if reviewed,
  so a **rung 3 candidate**.
- Aisha: **1 day a week** consolidating comment status. That is repeated and
  structured, so a **workflow at rung 2–3**.
- Repeat comments (9 of 46): finding how similar comments were answered
  before is a **knowledge retrieval problem** (module 4), a rung 1–2 aid.
- GPS negotiation positions: high consequence and judgement-heavy, so
  **rung 1 at most** (AI helps you prepare, you decide).

## The leader's job

As Head of Grid, your job isn't to pick tools. It is to:

1. Decide **which rung each task type is allowed** to sit on.
2. Make the **checks at each rung explicit** and cheap.
3. Move tasks **up one rung at a time**, with evidence (an eval or a measured
   pilot) before each step up.
4. Keep **accountability** visible at every rung.

That is the start of your efficiency strategy. Module 2 maps the full work
inventory. Module 8 turns it into a roadmap.

## What would you do?

**Pick the first pilot task for your team.** Say which rung it starts on,
what the check is, and what evidence would justify moving it up a rung after
six weeks.

This becomes your module 1 decision memo.

---

# File: m01-foundations/lab.md

```yaml
title: "Lab 1: Memory vs grounded - and the three modes"
minutes: 45
```

- **Where:** your work laptop, VS Code + GitHub Copilot.
- **Data:** the public NER text only. No company or project files.
- **You'll need:** the lab files. Use **Download lab files** at the top of this page.

## Setup (5 min)

1. Unzip the lab files and open the `lab-m01` folder in VS Code.
2. From the AEMC website, open the **current version of the NER** (public).
   Find clause **S5.2.5.13** (voltage and reactive power control).
3. Paste the clause text into `sources/ner-s5.2.5.13.md`, under the heading
   that records the **NER version number and date**.

## Part A: from memory (5 min)

1. Open Copilot Chat in **Ask** mode. Start a new chat with **no files
   attached**.
2. Ask: *"What does NER clause S5.2.5.13 require for voltage control rise time
   and settling time under the automatic access standard? Be specific."*
3. Paste the answer into `results.md` under **Part A**.

## Part B: grounded (10 min)

1. Start a **new** chat. Attach `sources/ner-s5.2.5.13.md` (use `#file` or
   drag it in).
2. Run the prompt in `.github/prompts/grounded-clause-summary.prompt.md`.
   If your VS Code supports prompt files, type `/grounded-clause-summary`.
   Otherwise copy the prompt text in.
3. Paste the answer under **Part B**.

## Part C: score both (10 min)

In `results.md`, fill in the scoring table. For each specific claim (a number,
a clause reference, a condition), mark it as:

- ✅ **Correct**: matches the source text
- ❌ **Wrong**: contradicts the source text
- ❓ **Unverifiable**: the source doesn't say

## Part D: watch the three modes (10 min)

Give the same task to each mode, in a new chat each time:

> *"Create `checklist.md`: a review checklist for an engineer checking a
> voltage control step-response study against S5.2.5.13, based only on
> `sources/ner-s5.2.5.13.md`. One line per check, each with the sentence it
> comes from."*

1. **Ask** mode: note that it answers in chat and changes no files.
2. **Edit** mode (if available in your version): note that it proposes a file
   change for you to accept.
3. **Agent** mode: note the **steps it takes**, which files it reads, what it
   creates, and **when it asks permission**.

Record what you saw under **Part D**.

## Part E: reflect (5 min)

Answer the three questions at the bottom of `results.md`. Then mark the lab
done in the app and paste your one-line takeaway into the notes.

## If something isn't available

- **No Edit mode:** skip it, because the important comparison is Ask vs Agent.
- **Prompt files not supported:** copy the prompt text in by hand.
- **Can't download the NER at work:** do Parts A–C on any public clause text
  you can reach. The method matters more than the clause.

---

# File: m01-foundations/memo.md

```yaml
title: "Memo 1: Your first pilot"
```

Write **one page or less**. Use the fictional Larkspur Downs context, or keep
it generic. **Don't write about real projects, people or company data here.**
You can write the real version at work.

## The question

> Which task should your team pilot first with AI, on which rung of the
> autonomy ladder, with what checks, and what evidence would move it up a rung
> after six weeks?

## Template

1. **The task:** what it is, how often it happens, and roughly how much time it
   takes now.
2. **Why this one:** using the four ladder questions (consequence, ease of
   checking, repetition, data sensitivity).
3. **Starting rung and design:** chat, workflow or agent; which Copilot
   features and tools.
4. **The check:** who checks what, and how you keep checking cheap.
5. **Success evidence after six weeks:** what you measure (time, rework,
   errors, review comments).
6. **The risk you're most worried about**, and how you'll handle it.
7. **What you'll tell the team:** two sentences.

---

# File: m02-mapping/lessons/01-map-before-you-automate.md

```yaml
title: Map before you automate
minutes: 10
```

## The trap

The easiest AI project to start is the one someone is excited about. The most
valuable one is usually somewhere else.

Suppose Tom's plotting script gets 80% faster. If plotting is 15% of an
engineer's week, you've saved about 12% of that week. That's worth having.
But if each R1 package still goes through three review rounds, with weeks of
waiting between them, **the energisation date hardly moves**.

Before choosing where AI goes, you need a map of where the time and the
delays actually are.

## Two kinds of time

| | Touch time | Elapsed time |
|---|---|---|
| **What it is** | Hours someone is actively working on it | Calendar time from start to finish |
| **Example** | Tom's 4 days re-running studies | 10 weeks from R1 submission to approval |
| **What AI changes** | Directly: faster drafting, scripting, searching | Indirectly: fewer review rounds, faster turnarounds |
| **Who feels it** | The team (workload) | The customer (schedule, revenue) |

Connection work usually has **low flow efficiency**: most of the elapsed time
is waiting for a review, a model, a meeting or a decision. Shaving hours off
touch time reduces workload. Removing a review round moves dates.

Your strategy needs both stories: **capacity** (the same team handles more
projects) and **speed** (projects reach energisation sooner).

## Value demand and failure demand

A useful idea from service design:

- **Value demand:** work the customer actually wants done, such as the first
  study set, the GPS proposal or the R2 report.
- **Failure demand:** work caused by something not being done right the first
  time, such as answering a comment because a plot was unlabelled, a study case
  was missing, or the model documentation didn't match the model.

Failure demand is often a large share of a connection team's work, and it's
**self-inflicted**. AI can help answer those comments faster. But it can also
help **stop them from being raised**, by checking a package for consistency
before it goes out. The second is usually worth far more.

## Not every problem is an AI problem

Mapping often turns up fixes that don't need AI at all: a standard report
template, a shared case list, an agreed plotting style, a checklist. Write
them down. They count toward the efficiency strategy too, and some are
**prerequisites**. An AI assistant drafting into a messy template produces
messy drafts faster.

## What would you do?

Your manager asks for "an AI plan" by the end of the quarter.

**What two numbers would you want before choosing any AI pilot, and where in
your team would you get them?**

---

# File: m02-mapping/lessons/02-value-stream.md

```yaml
title: Mapping the connection value stream
minutes: 12
```

## What a value-stream map shows

A value-stream map follows **one unit of work** from start to finish. For your
team, that's one connection project. For each stage it records:

- **Inputs and outputs:** what comes in, what goes out.
- **Who:** which roles do the work.
- **Touch time:** the hours of active work.
- **Wait time:** the calendar time waiting on others.
- **Rework loops:** where work comes back.
- **Handoffs:** where work passes between people or organisations.

## A first-pass map for a NEM connection

| Stage | Main outputs | Who | Typical rework loop | Main waits |
|---|---|---|---|---|
| Enquiry / application | Preliminary studies, application data | Engineer, grid lead | Data requests | TNSP response |
| GPS negotiation (5.3.4A) | Proposed GPS, justification studies | Engineer, grid lead | Negotiation rounds | TNSP and AEMO positions |
| R1 package | Models, DMAT, study reports, documentation | Engineers | **Review comment rounds** | AEMO / TNSP review |
| Commissioning | Test plans, hold point submissions, test results | Engineers, grid lead | Hold point queries | Site and network access, approvals |
| R2 validation | Validated models, validation report | Engineers | Validation comments | AEMO review |
| Ongoing compliance (rule 4.15) | Compliance monitoring, alteration submissions (5.3.9) | Engineers | Ad hoc queries | Variable |

*(Clause references are for orientation. Check them against the current NER.)*

The grid leads' work runs alongside every stage: correspondence, status,
schedule, risk and commitments.

## Where to look on the map

Five signals point to the best opportunities:

1. **Repeated rework loops.** Review rounds are the obvious one. How many
   rounds? How many comments per round? How many repeat earlier ones?
2. **Long waits after handoffs.** Is the wait truly external, or is it
   partly because the package wasn't complete?
3. **Copy-and-transform work.** The same information re-keyed into a report,
   a register, a status update and an email.
4. **Searching.** "Has anyone seen this comment before?" "Which version of
   the model went in?"
5. **Same task, different way.** Every engineer has their own plotting
   script. Every grid lead has their own register format.

## Doing it in practice

You don't need a workshop week. A practical version:

1. **One hour with 2–3 people per role**, walking one recent project from
   start to finish on a whiteboard.
2. **Two weeks of light timesheet tagging**, using task codes rather than
   free text (the module 2 lab uses data like this).
3. **Pull the review comment registers** from two or three past projects and
   categorise them.

AI can help with steps 2 and 3, and that's the lab this week.

## What would you do?

Looking at the table, **which stage would you map in detail first for your
team, and why that one?** Think about where both touch time and elapsed time
are most at stake.

---

# File: m02-mapping/lessons/03-task-inventory.md

```yaml
title: Building the task inventory
minutes: 10
```

## From stages to tasks

The value-stream map shows *where* time goes. The **task inventory** breaks it
into units small enough to improve. A good task is:

- **Specific:** "Produce FRT plots for the study report", not "Studies".
- **Repeatable:** it happens on most projects, or every week.
- **Owned by a role:** engineer or grid lead.
- **Measurable:** you can estimate hours per occurrence and occurrences per month.

## The five categories of lost time

The plan for this course groups opportunities into five categories. Tag every
task with one:

| Category | Engineer examples | Grid lead examples |
|---|---|---|
| **Repetitive drafting** | Report sections, model documentation | Status reports, routine correspondence |
| **Study and post-processing toil** | Case setup, batch runs, plots, results tables | — |
| **Review comment churn** | Technical responses, re-runs | Comment register, chasing owners |
| **Coordination overhead** | Internal reviews, handovers | Meetings, actions, schedule updates |
| **Knowledge loss** | "How did we fix this last time?" | "What did we agree with this TNSP?" |

## Where the data comes from

| Source | Gives you | Watch out for |
|---|---|---|
| Timesheets with task codes | Hours by task and role | Codes too coarse, or used inconsistently |
| Jira / task tracker | Counts, cycle times | Only covers what gets ticketed |
| Comment registers | Comment volume, categories, repeats | Different formats per project |
| Short interviews | The "why" and the frustrations | Recency bias |
| A two-week diary | Fine detail | Effort to keep up |

Use **at least two sources** and compare them. If the timesheets say plotting
is 5% of the week and every engineer complains about it, find out why.

## Where AI helps with the inventory itself

This is the first practical use for your own work as a leader:

- **Categorising free text:** hundreds of comment descriptions or timesheet
  notes sorted into categories, with you checking a sample.
- **Summarising interviews:** themes from your notes, with quotes.
- **Analysis through code:** Copilot writes the script that totals hours by
  task and role. You check the script, not each number.

That last point matters. **Totals and percentages come from code, not from the
chat.** Lab 2 shows you why.

## Confidentiality reminder

At work, use only sanctioned tools for real timesheet and comment data.
Individual timesheet data is personal information: report by role and task,
not by person, when you share results.

## What would you do?

Raj says: "Timesheets are fiction anyway. Everyone just books to the project code."

**How do you get a usable picture of where engineering time goes, without
creating a reporting burden the team resents?**

---

# File: m02-mapping/lessons/04-scoring.md

```yaml
title: Scoring the opportunities
minutes: 12
```

## A simple, defensible scoring model

You need a ranking you can explain to your manager, your team and a sceptical
senior engineer. Score each task from 1 to 5 on six factors:

| Factor | Question | 1 = | 5 = |
|---|---|---|---|
| **Volume** | Hours per month across the team? | < 5 h | > 60 h |
| **Repeatability** | Same steps each time? | Always different | Identical |
| **Checkability** | Can a person verify the result faster than doing it? | Hard to check | Quick to check |
| **Data access** | Are the inputs available to sanctioned tools? | Locked away or confidential | Ready in files, SharePoint or Jira |
| **Consequence** | Impact if an error slips through? (inverted: high consequence scores low) | Reaches AEMO or affects the GPS | Internal only |
| **Elapsed-time impact** | Does improving it move project dates? | No | Removes waits or rounds |

A simple priority score:

- **Value** = volume + elapsed-time impact
- **Feasibility** = repeatability + checkability + data access + consequence
- **Priority** = value × feasibility

Keep the formula simple enough to explain on one slide. Its purpose is to
**structure the conversation**, not to produce a precise answer.

## Reading the result

Plot value against feasibility:

| | Low feasibility | High feasibility |
|---|---|---|
| **High value** | **Strategic bets:** need groundwork (data, templates, tools) | **Do first** |
| **Low value** | Leave | **Quick wins:** good for learning and confidence |

## Common mistakes

- **Scoring the tool, not the task.** "Copilot is good at code" isn't a
  score. "Plotting is 16% of engineering time, highly repeatable and easy to
  check" is.
- **Ignoring consequence.** A high-volume task that feeds directly into a
  submission still needs a human check. That's fine, but count the check in
  the time saved.
- **Forgetting failure demand.** A task that *prevents* review comments can
  outrank one that answers them faster, even with lower volume.
- **Over-precision.** Two people's scores will differ by a point. If the
  ranking flips because of that, the tasks are close: decide on other grounds.

## Getting AI to help, safely

Copilot can draft a first-pass score for each task from a written rubric,
with a one-line reason per score. **You** review and adjust, especially
consequence and data access, which need your judgement. The reasons make your
review fast. Same pattern as before: ask for evidence, check the evidence.

## What would you do?

Two candidates come out level:
**(a)** an automated pre-submission consistency check of the R1 package, and
**(b)** AI-drafted first responses to review comments.

**Which would you fund first, and what does the scoring model miss in this
comparison?**

---

# File: m02-mapping/lessons/05-portfolio.md

```yaml
title: From ranking to a portfolio
minutes: 10
```

## Why a portfolio, not a single pilot

A single pilot is fragile. If it stalls, "AI doesn't work here" becomes the
story. A small **portfolio** of three to five opportunities balances:

| Balance | Why |
|---|---|
| **Quick wins and strategic bets** | Quick wins build confidence and skills; bets deliver the big gains |
| **Engineers and grid leads** | Both halves of the team should see benefit early |
| **Touch time and elapsed time** | Capacity for the team *and* speed for customers |
| **AI and non-AI fixes** | Templates and standards often unlock the AI gains |

## An example portfolio (fictional team)

| # | Opportunity | Type | Role | Rung (module 1) |
|---|---|---|---|---|
| 1 | Standard plotting and results-table script, written with Copilot | Quick win | Engineers | 3: do, then review |
| 2 | Comment register workflow: classify, assign, draft, track in Jira | Strategic | Grid leads | 2: draft |
| 3 | Pre-submission consistency check (documentation vs model vs study cases) | Strategic | Engineers | 2–3 |
| 4 | Shared report template and case list | Non-AI enabler | Both | — |
| 5 | Searchable lessons-learned from past comment rounds | Strategic | Both | 1: assist |

## Baseline before you start

You can't show improvement without a "before". For each portfolio item,
choose **one or two measures** and record them now:

| Measure | Example |
|---|---|
| Hours per occurrence | Hours to produce the plot set for a study run |
| Cycle time | Days from receiving comments to submitting responses |
| Review rounds | Rounds per R1 package |
| Failure demand share | % of comments caused by our own gaps |
| Repeat comments | % of comments repeating an earlier one |

Keep them light. A measure that needs a new reporting process probably won't
survive.

## Sequencing

1. **Weeks 1–6:** the enablers and one quick win. Learn the tools on low-risk work.
2. **Weeks 4–12:** the first strategic bet, starting as a workflow at a low rung.
3. **After each pilot:** review against the baseline and decide whether to stop, adjust or scale.

Module 8 turns this into your full strategy and roadmap.

## What would you do?

**Draft your own portfolio of three items for the fictional team, using the
lab results.** Then write memo 2 on why those three, and the baseline you'd
record.

---

# File: m02-mapping/lab.md

```yaml
title: "Lab 2: Where does the time go?"
minutes: 60
```

- **Where:** your work laptop, VS Code + GitHub Copilot, Python (most power system engineers already have it).
- **Data:** fictional files in the lab download (`data/` folder), covering four weeks of timesheets for a six-person team, eight projects and about 400 review comments.
- **Goal:** a ranked opportunity list you could defend to your manager.

## Setup (5 min)

1. Unzip the lab files and open the `lab-m02` folder in VS Code.
2. Skim `data/timesheet.csv`, `data/projects.csv` and
   `data/review_comments.csv`. Don't analyse yet.

## Part A: let Copilot read the data (5 min)

In **Ask** mode, attach the three CSVs and ask:

> *"Describe the structure of these three files: columns, what each row
> means and how they join. Don't calculate any totals."*

Check its description against the files.

## Part B: totals from memory vs from code (15 min)

1. Still in Ask mode, ask: *"What percentage of power system engineer hours is
   POSTPROC-PLOTS?"* Write its answer in `results.md`.
2. Switch to **Agent** mode and run the prompt in
   `.github/prompts/analyse-time.prompt.md`. It asks Copilot to write
   `analyse.py`, run it, and produce `summary.md`.
3. **Check the script** rather than the numbers. Read `analyse.py`: does it
   filter by role correctly? Does it sum hours, or count rows?
4. Compare the script's figure with the chat's figure from step 1.

## Part C: failure demand (10 min)

Ask Agent mode to extend `analyse.py`:

> *"From review_comments.csv, show comments and hours-to-close by category,
> and the share of comments marked repeat_of_earlier. Add a section to
> summary.md."*

Then decide for yourself, without AI, **which categories are failure
demand**. Record your list and the share it represents in `results.md`.

## Part D: score the opportunities (20 min)

1. Open `scoring-rubric.md` (the six factors from lesson 4) and
   `opportunities.csv` (a starter list of 10 tasks).
2. In Agent mode:
   > *"Using scoring-rubric.md and the figures in summary.md, fill in a
   > first-pass score (1–5) for each factor in opportunities.csv, with a short
   > reason in the reason column. Don't calculate the priority."*
3. **Review every score.** Change at least the consequence and data access
   scores where your judgement differs. Copilot can't know your
   organisation's risk appetite.
4. Ask Copilot to add a priority column to `analyse.py` using the formula in
   the rubric, and print the ranked list.

## Part E: reflect (5 min)

Answer the questions at the bottom of `results.md`. Mark the lab done in the
app and note your top three.

## If something isn't available

- **No Python:** ask Copilot to write Excel formulas or a pivot-table recipe
  instead. The lesson is the same: calculations live somewhere checkable.
- **Agent mode can't run commands:** let it write the script, then run
  `python analyse.py` in the terminal yourself.

---

# File: m02-mapping/memo.md

```yaml
title: "Memo 2: Your opportunity portfolio"
```

Write **one page or less** about the fictional team, using your lab results.
**No real team data here.** You can do the real version at work, with sanctioned tools.

## The question

> Which three opportunities should the team pursue first, why those three,
> and what baseline will you record before starting?

## Template

1. **The three opportunities:** one line each, with type (quick win,
   strategic bet or enabler) and role (engineers, grid leads or both).
2. **Why these:** what the data showed (time, failure demand, repeats) and
   how they scored.
3. **What you deliberately left out**, and why.
4. **Balance check:** touch time vs elapsed time, engineers vs grid leads,
   AI vs non-AI.
5. **Baseline:** one or two measures per opportunity, and how you'll collect them.
6. **The first step next week.**

---

# File: m03-study-automation/lessons/01-study-pipeline.md

```yaml
title: The study pipeline and where the hours go
minutes: 10
```

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

---

# File: m03-study-automation/lessons/02-copilot-pair.md

```yaml
title: Copilot as an engineer's pair programmer
minutes: 12
```

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

---

# File: m03-study-automation/lessons/03-gps-to-checks.md

```yaml
title: Turning GPS requirements into code
minutes: 12
```

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

---

# File: m03-study-automation/lessons/04-known-answers.md

```yaml
title: "Trusting the checker: known-answer tests"
minutes: 10
```

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

---

# File: m03-study-automation/lessons/05-personal-to-team.md

```yaml
title: From personal scripts to a team toolkit
minutes: 10
```

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

---

# File: m03-study-automation/lab.md

```yaml
title: "Lab 3: A GPS checker you can trust"
minutes: 75
```

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

---

# File: m03-study-automation/memo.md

```yaml
title: "Memo 3: The team study toolkit"
```

Write **one page or less**, using the fictional team. **No real team or
project details.**

## The question

> Should the team build a shared, Copilot-assisted study toolkit? If yes, what
> goes in first, who owns it, and what rules keep it trustworthy?

## Template

1. **Recommendation:** yes or no, in one sentence.
2. **First scope:** which study stages, and why those (link to module 2's
   scores).
3. **Trust rules:** definitions as data, known-answer tests, review, "can't
   assess" handling, filtering decisions.
4. **Ownership and time:** who, how much time, and what comes off their plate.
5. **Data and policy guardrails:** confidential models, approved tools.
6. **Measure of success after 3 months:** for example hours per study re-run,
   number of engineers using it, defects found by tests.
7. **The objection you expect, and your answer.**

---

# File: m04-knowledge/lessons/01-retrieval.md

```yaml
title: "Retrieval: grounding at scale"
minutes: 10
```

## The problem with attaching files by hand

Module 1's main habit was grounding: give the model the source and make it
quote. That works when you can attach the right three files. It stops working
when the source is "all the comment registers from the last 20 projects" or
"every TNSP requirement document we hold".

**Retrieval** solves this. Before the model answers, a search step finds the
most relevant passages and puts *only those* into the context. This is usually
called **RAG** (retrieval-augmented generation).

## How it works, in four steps

1. **Split:** documents are cut into chunks (a section, a table, a few paragraphs).
2. **Index:** chunks are indexed for search, by keywords, by meaning (using
   *embeddings*, numeric fingerprints of meaning), or both.
3. **Search:** your question is matched against the index; the top few
   chunks are returned.
4. **Answer:** the model answers from those chunks, ideally citing them.

When Copilot uses a SharePoint or Confluence tool through MCP, steps 1–3
happen on the tool's side: it runs a search and hands back results. The model
only sees what the search returned.

## Where retrieval goes wrong

| Failure | Grid example | Defence |
|---|---|---|
| **Wrong chunk** | Finds a similar clause from another project's GPS | Cite file and section; check them |
| **Missing document** | The TNSP letter that changed the requirement is in someone's inbox | Know what's indexed; keep key records in the shared store |
| **Stale version** | Retrieves Rev B of the study report, not Rev C | Clear revision and status in every document; tell the model to check |
| **Conflicting sources** | Two documents give different deadbands | Ask the model to flag conflicts, not resolve them |
| **Chunk loses context** | A table row retrieved without its heading | Good document structure; ask for the surrounding section |

The pattern: **retrieval quality depends on document quality**. A
well-organised SharePoint with clear revisions gives good answers. A messy one
gives confident answers built on the wrong file.

## What "good" looks like

A good retrieval answer:

- quotes the passage it relies on,
- names the **document, revision and section**,
- says "not found" when the search came back empty,
- flags when sources disagree.

You can require all four in your team's Copilot instructions. Lab 4 does.

## What would you do?

An engineer asks Copilot, through the SharePoint tool, "what droop did we agree
on Larkspur Downs?". It answers "5%" and cites a draft GPS from early
negotiation. The executed GPS says 4%.

**What went wrong, and what two changes would stop it happening again?**

---

# File: m04-knowledge/lessons/02-traceability.md

```yaml
title: Requirements traceability for a connection
minutes: 12
```

## The chain reviewers want to follow

Every GPS requirement should trace to evidence:

1. **NER clause**
2. → **GPS requirement**
3. → **study case or test**
4. → **result**
5. → **document and section**

A **compliance matrix** (or traceability matrix) is that chain as a table:
one row per requirement, with the evidence and a status. Many TNSPs ask for
one. Even when they don't, it's the fastest way to answer "where do you show
that?". Most review comments are some form of that question.

| GPS ID | Requirement (quoted) | Evidence | Status |
|---|---|---|---|
| GPS-4 | "rise time ≤ 2.0 s and settling ≤ 5.0 s…" | Study report Rev C §5, cases VS-01–04 | Evidenced |
| GPS-5 | "switchable remotely…" | — | **Gap** |

## Why it's worth the effort

- **Finds gaps before the reviewer does.** A Gap row found internally costs a
  study. A Gap found by AEMO costs a review round.
- **Makes responses fast.** Most comments are answered by pointing at a row.
- **Survives staff changes.** The reasoning isn't only in one engineer's head.
- **Directly targets failure demand** (module 2). "Missing or unclear study
  case" was one of the biggest comment categories in lab 2's data.

## Where AI helps, and where it mustn't decide

| Step | AI role | Human role |
|---|---|---|
| Extract requirements from the GPS | Draft rows with exact quotes | Check quotes and coverage |
| Find candidate evidence | Search reports and propose links with quotes | **Confirm each link** |
| Assign status | Propose Evidenced, Partial or Gap with reasons | **Decide**, especially Partial |
| Check against TNSP requirements | Flag likely shortfalls | Decide what to fix |

The rule from module 1 applies: quote-backed claims make checking cheap. A
matrix row with a quote can be confirmed in seconds. A row without one has to
be re-researched.

## The traps

- **Superseded documents.** The evidence exists, but in a revision produced
  with an old model. It looks like evidence and isn't.
- **Partial coverage.** "Voltage disturbance ride-through" covered for
  overvoltage only. A keyword search finds it and calls it done.
- **Evidence by assertion.** "The plant complies with GPS-7" in the summary
  isn't evidence. The study section is.

Lab 4 has all three.

## What would you do?

**Should your team build the compliance matrix at the start of R1 preparation,
or at the end before submission? What changes about how the team works if it's
at the start?**

---

# File: m04-knowledge/lessons/03-document-hygiene.md

```yaml
title: Your documents as a knowledge base
minutes: 10
```

## The uncomfortable truth

The biggest limit on AI search across your documents isn't the AI. It's the
state of the document store. Typical findings when a team first tries it:

- Five files called `Study report FINAL v3 (2).docx`.
- The executed GPS lives in an email attachment, not SharePoint.
- Comment registers in different formats on every project.
- Decisions agreed in meetings but never written down.

An AI assistant searching that store will find *something* and answer
confidently from it.

## Minimum hygiene for AI-ready documents

| Practice | Why it matters for AI |
|---|---|
| **Revision and status in the document itself** (not only the file name) | The model can see "SUPERSEDED" in the text it retrieves |
| **One agreed home per document type** (GPS, reports, registers, correspondence) | Search knows where to look; nothing important lives only in email |
| **Consistent structure** (section numbers, case IDs, GPS IDs) | Chunks keep their meaning; citations are precise |
| **Structured registers** (same columns on every project) | Comments become searchable data, not prose |
| **Decision records** (short notes of agreements with TNSP/AEMO) | Agreements are findable later |

None of this needs AI. All of it multiplies what AI can do, and it's a
legitimate part of your efficiency strategy. It's the "non-AI enabler" from
module 2.

## Permissions carry through

When Copilot searches SharePoint or Confluence through an MCP tool, it acts
**with your permissions**. It can only find what you can open. That's
reassuring, but note two consequences:

- If permissions are too broad (everyone can see every customer's folder), AI
  search will happily combine information across customers.
- Search makes it far easier to *find* things people technically had access
  to but would never have stumbled on.

Check that project and customer folders are permissioned the way you'd want
**before** turning AI search loose on them.

## Customer confidentiality

Each developer's project information is usually confidential to that
developer. Lessons learned across projects are valuable, but a response for
one customer must never contain another customer's names, data or results.
Capture **lessons as generic approaches** ("TNSP-A expects a mode switching
section"), not as copies of another customer's evidence.

## What would you do?

**Pick three hygiene practices from the table to introduce first. Who owns each,
and how would you make them stick without adding admin load?**

---

# File: m04-knowledge/lessons/04-precedent.md

```yaml
title: Keeping knowledge between projects
minutes: 10
```

## "Didn't we answer this on another project?"

In lab 2's fictional data, about one comment in eight repeated an earlier
comment. Across a portfolio, the same TNSP asks the same questions on
project after project. Each time, someone either remembers (if they're still
here) or works it out again.

A **comment library** fixes this: every resolved comment captured once, in a
structured form, so the next project can find it.

## What to capture

| Field | Example |
|---|---|
| TNSP or AEMO | TNSP-A |
| GPS topic | Control modes |
| Comment (generalised) | Evidence of remote mode switching requested |
| How it was resolved | Added study cases for each mode transition |
| **Reusable lesson** | Include a mode-switching section by default for TNSP-A |
| Project | For internal reference only |

The **reusable lesson** column is the valuable one. It turns a one-off fix
into a template change or a checklist item, which removes the failure demand
at its source.

## Finding precedent with AI

With a structured library, Copilot can:

1. Take a new comment.
2. Find similar past comments, by meaning not just keywords
   ("switch between modes" matches "mode transition").
3. Show the past resolution and lesson.
4. Check whether the current project already addresses it.
5. Draft a response for the engineer to review.

This is a **workflow at rung 2 (draft)**. The engineer decides.

## The confidentiality trap

Past resolutions sometimes mention the other project's developer, their data
or their results. A drafted response must **use the approach, not the
content**. Lab 4 includes a library entry that would leak another developer's
name and test records if copied. Your Copilot instructions should forbid it,
and the engineer review should catch it if the instructions fail.

## Capturing at the right moment

Knowledge capture fails when it's a separate task done "later". Make it part
of **closing a review round**: the grid lead's register already has the
comment and resolution. Adding the topic and lesson takes two minutes per
comment, and AI can draft them for confirmation.

## What would you do?

**Who should own the comment library, the grid leads or the engineers, and
what one rule would keep it from going stale?**

---

# File: m04-knowledge/lessons/05-knowledge-workflow.md

```yaml
title: Designing the team's knowledge workflow
minutes: 10
```

## Putting it together

Modules 1–4 give you the parts: grounding, quote-backed claims, structured
data, retrieval, and the autonomy ladder. A knowledge workflow combines them
into something the team uses every week.

## A worked design (fictional team)

| Step | When | Who | Tools | Rung |
|---|---|---|---|---|
| 1. Build the compliance matrix | Start of R1 preparation | Engineer | Copilot + GPS + report drafts | 2: draft |
| 2. Update the matrix as studies finish | Each study set | Engineer | Copilot | 2–3 |
| 3. Pre-submission gap check | Before submission | Second engineer | Copilot + matrix + TNSP requirements | 2 |
| 4. Find precedent for new comments | Each review round | Grid lead | Copilot + comment library (+ Confluence/SharePoint via MCP where allowed) | 2: draft |
| 5. Capture lessons at round close | Round closed | Grid lead drafts, engineer confirms | Copilot | 2 |
| 6. Turn lessons into template changes | Quarterly | Lead engineer | — | 0 |

Step 6 matters most. Knowledge that only sits in a library still depends on
someone searching for it. A lesson built into the report template or the
checklist prevents the comment for everyone.

## Measuring it

Use the module 2 baselines:

- **Repeat comment rate:** should fall as lessons reach templates.
- **Comments per round** in the "missing or unclear" categories.
- **Time to respond** to a round.
- **Gaps found internally vs by reviewers:** the compliance matrix should
  move gap-finding earlier.

## Start small

1. One project, one review round.
2. A comment library seeded from two or three past projects' registers (AI can
   help categorise and generalise them, with engineer confirmation).
3. Compliance matrix for the next R1 package.
4. Review after the round: time, quality, and what the team thought.

## What would you do?

**Draft the one-paragraph announcement you'd send the team introducing the
compliance matrix and comment library. What would make engineers see it as
help rather than more admin?**

This feeds memo 4.

---

# File: m04-knowledge/lab.md

```yaml
title: "Lab 4: Traceability and precedent"
minutes: 60
```

- **Where:** your work laptop, VS Code + GitHub Copilot. No Python needed.
- **Data:** a fictional document set in the lab files (`lab-m04/docs`): a GPS
  excerpt, two revisions of a study report, TNSP report requirements, a comment
  library from past projects, and three new round 2 comments.
- **Goal:** a compliance matrix that would survive review, and draft
  responses that use precedent without leaking other customers' information.

## Setup (5 min)

1. Unzip the lab files and open the `lab-m04` folder in VS Code.
2. Read `.github/copilot-instructions.md`, the team rules for this kind of
   work. Notice the rules on revisions, statuses and precedent.
3. Skim the files in `docs/`. Don't look for answers yet.

## Part A: extract the requirements (10 min)

In **Ask** mode, attach the GPS excerpt and ask Copilot to list every GPS
requirement with its ID, NER reference and an **exact quote**. Check three of
the quotes word for word against the file.

## Part B: build the compliance matrix (15 min)

1. In **Agent** mode, run `.github/prompts/build-matrix.prompt.md`. It
   fills `compliance-matrix.csv`.
2. Check every **Evidenced** row: open the cited section and confirm that the
   quote is there and demonstrates the requirement.
3. Pay particular attention to GPS-5 and GPS-9. Are their statuses right?
   What does the superseded report say about them?

## Part C: check against the TNSP's requirements (5 min)

Ask Copilot which of TNSP-A's report requirements (TR-1 to TR-4) the current
study report might not meet, with quotes. Decide for yourself.

## Part D: precedent and draft responses (15 min)

1. Run `.github/prompts/find-precedent.prompt.md`.
2. For each draft response, check:
   - Is the precedent relevant?
   - Did it correctly decide whether the issue is a real gap?
   - **Does any draft mention another project, developer or their data?** If
     so, the instructions failed. Fix the draft, then strengthen the
     instruction.

## Part E (optional): the same through SharePoint or Confluence

Only if your organisation allows the tool, and **only with these fictional
files**:

1. Upload `docs/` to a personal or sandbox SharePoint folder or Confluence
   space you control.
2. In Agent mode, enable the SharePoint or Confluence tool and repeat Part B,
   asking Copilot to *search* for the documents rather than attaching them.
3. Compare: did search find both report revisions? Did it notice the status
   line? Did citations still name file and section?

## Reflect (5 min)

Answer the questions in `results.md`, mark the lab done, and note which team
rule did the most work.

---

## Answer key

Try the lab first.

| GPS | Expected status | Why |
|---|---|---|
| GPS-1 | Evidenced | Rev C §3 |
| GPS-2 | Evidenced | Rev C §4 (FRT-01–14 incl. Attachment B sequence; Iq 28–34 ms) |
| GPS-3 | Evidenced | Rev C §4 (P recovery 48–62 ms) |
| GPS-4 | Evidenced | Rev C §5, but TR-3 not met: the definitions of rise and settling time aren't stated |
| GPS-5 | **Gap** | Only Rev B §7 covers it, and Rev B is superseded (old model). Rev C Appendix A lists it as an open item. Rev C §2's blanket claim of compliance isn't evidence |
| GPS-6 | Evidenced | Rev C §6 |
| GPS-7 | Evidenced | Rev C §8 |
| GPS-8 | Evidenced | Rev C §9 |
| GPS-9 | **Partial** | Rev C §10 covers overvoltage only; undervoltage cases are missing |

**TNSP requirements:** TR-3 isn't met (definitions not stated). TR-4 is only
partly met (model version stated once at the top, not with every result).
TR-2 can't be confirmed from the text, so you'd need to check the figures.

**Precedent:**
- **N01** (mode switching): precedent L01 fits. It's a real gap (GPS-5). The
  approach is to add mode-transition study cases with model v4.2. **Trap:** L01's
  resolution mentions another developer and their site test record; the draft must not.
- **N02** (settling time definition): precedent L02 fits. Fix: state the
  definitions in the method section (also fixes TR-3).
- **N03** (undervoltage cases): precedent L06 fits. It's a real Partial (GPS-9). Add the
  undervoltage cases.

**Lessons that should become template changes:** L01 (default mode-switching
section), L02 (state definitions), L03 (plotting template), L04 (model
version in every section).

---

# File: m04-knowledge/memo.md

```yaml
title: "Memo 4: The team knowledge workflow"
```

Write **one page or less** about the fictional team. **No real documents,
projects or customers.**

## The question

> How should the team capture and reuse what it knows, from GPS requirements
> to review comment lessons, so that fewer comments are raised and the ones
> that are raised get answered faster?

## Template

1. **The problem in numbers:** repeat comments, "missing or unclear"
   comments, time lost searching (use lab 2 and lab 4).
2. **The workflow:** compliance matrix, comment library, and lessons turned
   into templates. Who does what, when.
3. **Document hygiene first:** the two or three practices that must come before
   AI search will work.
4. **Confidentiality rules:** permissions, and using precedent across customers.
5. **Tools:** what runs in Copilot alone, and what needs SharePoint or Confluence MCP.
6. **Measures:** two outcome measures with baselines.
7. **The first project to try it on**, and why.

---

# File: project-pack/01-overview.md

```yaml
title: Larkspur Downs Wind Farm
```

> **Everything in this project pack is fictional.** The project, companies,
> people, substation and numbers are made up for training. Any resemblance to a
> real project is coincidental.

## The project

| Item | Detail |
|---|---|
| Project | Larkspur Downs Wind Farm (LDWF) |
| Developer | Larkspur Energy Pty Ltd (fictional) |
| Capacity | 300 MW: 60 × 5.0 MW full-converter wind turbines |
| Collector system | 33 kV, 6 feeders |
| Main transformers | 2 × 180 MVA, 330/33 kV |
| Connection point | Tallowood 330 kV terminal station (fictional), owned by **the TNSP** |
| Market | National Electricity Market (NEM) |
| Your organisation | The grid team of the turbine supplier, contracted to deliver the connection studies, models and GPS compliance evidence |

## Why this project

The course uses LDWF as its running example. It is a typical NEM connection:
negotiated GPS, an R1 package in review, AEMO and TNSP comment rounds, a
commissioning programme with hold points, and an R2 validation still to come.
Every lab uses its synthetic data, never real project data.

---

# File: project-pack/02-cast.md

```yaml
title: The cast
```

All people are fictional.

| Name | Role | What they care about |
|---|---|---|
| **You** | Head of Grid at the turbine supplier | Throughput, quality and predictability across a portfolio of connections; a team that isn't burning out |
| **Mei** | Lead power system engineer | Model accuracy, study quality, not repeating the same study setup on every project |
| **Tom** | Graduate power system engineer | Learning fast; currently spends most of his week on plotting and report formatting |
| **Raj** | Senior power system engineer | EMT models and DMAT; sceptical of anything that can't show its working |
| **Elena** | Power system engineer | Commissioning tests and R2 validation; travels to site often |
| **Aisha** | Grid lead (technical project manager) | Keeping the developer, the TNSP and AEMO aligned; tracking hundreds of comments and commitments |
| **Kofi** | Grid lead | Runs four projects at once; lives in email and status reports |
| **Dan** | Connection manager at Larkspur Energy (the developer) | Schedule certainty and no surprises before financial close |
| **The TNSP connections engineer** | Reviews studies and models for the TNSP | Network security; clear, traceable answers to their comments |
| **The AEMO reviewer** | Assesses the GPS and the model package | Compliance with the NER and AEMO guidelines; model quality |

---

# File: project-pack/03-status.md

```yaml
title: Where the project is now
```

## Lifecycle position

1. Enquiry ✔
2. Application ✔
3. GPS negotiation ✔
4. Connection agreement ✔
5. **R1 package: in review round 2 ← we are here**
6. Commissioning (in 9 months)
7. R2 validation
8. Ongoing compliance

## Status snapshot (fictional)

- **R1 package:** submitted 10 weeks ago. Round 1 returned **112 comments**
  from AEMO and the TNSP; 66 are closed. Round 2 has **46 open comments**, and 9
  of them repeat earlier points in different words.
- **Study effort:** each re-run of the full study set takes Tom about
  **4 working days**. Most of that time goes on setting up cases, exporting
  results, plotting and pasting figures into the report.
- **Comment handling:** Aisha keeps the comment register in a spreadsheet,
  chases owners by email and spends about **a day a week** consolidating
  status for Dan.
- **Knowledge:** Mei remembers that a similar comment on a past project was
  resolved by a parameter change. Nobody can find where that was written down.

## Fictional GPS excerpt

These values are **invented for training** and are not taken from any
standard or real agreement.

| NER reference | Topic | Fictional negotiated position |
|---|---|---|
| S5.2.5.1 | Reactive power capability | 0.35 × rated active power at the connection point, over the full continuous voltage range |
| S5.2.5.5 | Response to disturbances (fault ride-through) | Remain connected for the agreed fault sequence; reactive current injection within 40 ms; active power back to 95% of pre-fault within 100 ms of clearance |
| S5.2.5.13 | Voltage and reactive power control | Voltage control mode; rise time ≤ 2.0 s and settling time ≤ 5.0 s for a 5% setpoint step |
| S5.2.5.14 | Active power control | Ramp rate limit adjustable to 5 MW/min |
| S5.2.5.11 | Frequency control | Droop 4%, deadband ±0.015 Hz |

Check every clause reference against the current public version of the NER.
Module 6 turns this into a habit.

---

# File: project-pack/04-portfolio.md

```yaml
title: The team's portfolio
```

Your team doesn't run one project. It runs a portfolio. All of these are
**fictional**; module 2's lab uses this list.

| ID | Project | MW | Stage | Network |
|---|---|---|---|---|
| P01 | Larkspur Downs | 300 | R1 review | TNSP-A |
| P02 | Coolabah Flats | 180 | GPS negotiation | TNSP-B |
| P03 | Ironbark Hill | 420 | Commissioning | TNSP-A |
| P04 | Saltbush Plains | 240 | R2 validation | TNSP-C |
| P05 | Wattle Creek | 150 | Application | TNSP-B |
| P06 | Bluegum Ridge | 360 | Ongoing compliance | TNSP-A |
| P07 | Mulga Point | 210 | R1 review | TNSP-C |
| P08 | Quandong Rise | 270 | Enquiry | TNSP-B |

**The team:** four power system engineers (Mei, Raj, Elena, Tom) and two grid
leads (Aisha, Kofi).

Each network business has its own habits: preferred report formats, typical
comments, how fast it turns reviews around. This is the kind of knowledge that
lives in people's heads.
