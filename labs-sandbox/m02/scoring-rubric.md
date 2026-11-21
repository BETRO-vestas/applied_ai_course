# Scoring rubric (from lesson 4)

Score each factor 1–5.

| Factor | Question | 1 = | 5 = |
|---|---|---|---|
| volume | Team hours per month? | < 5 h | > 60 h |
| repeatability | Same steps each time? | Always different | Identical |
| checkability | Can a person verify the result faster than doing it? | Hard | Quick |
| data_access | Inputs available to sanctioned tools? | Locked or confidential | Ready in files, SharePoint or Jira |
| consequence | Impact if an error slips through (inverted) | Reaches AEMO or affects the GPS | Internal only |
| elapsed_impact | Does improving it move project dates? | No | Removes waits or rounds |

```
value       = volume + elapsed_impact
feasibility = repeatability + checkability + data_access + consequence
priority    = value × feasibility
```

Monthly hours: the data covers 4 weeks, so treat the 4-week total as one month.
