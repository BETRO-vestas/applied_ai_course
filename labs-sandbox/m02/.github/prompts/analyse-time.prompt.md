---
description: Write and run a checkable analysis of the fictional timesheet data
---
Write a Python script `analyse.py` (standard library only: csv, collections)
that reads `data/timesheet.csv` and:

1. Totals hours by role.
2. Totals hours by role and task_code, with each task's percentage of that
   role's total hours.
3. Totals hours by project_id, joined to project names and stages from
   `data/projects.csv`.
4. Writes the results as Markdown tables to `summary.md`, sorted by hours,
   largest first.

Requirements:
- Sum the `hours` column. Do not count rows.
- Add a short comment above each calculation saying what it does.
- Print a single check line: total hours in the file, and the sum of the role totals (these must match).

Then run the script and show me the first table from `summary.md`.
