"""Generate the fictional data for the module 2 lab. Deterministic (fixed seed).

Run: python3 scripts/generate_m02_data.py
Writes to labs-sandbox/m02/data/. All people, projects and numbers are fictional.
"""
import csv, random
from pathlib import Path

random.seed(20261121)
OUT = Path(__file__).resolve().parent.parent / "labs-sandbox" / "m02" / "data"
OUT.mkdir(parents=True, exist_ok=True)

projects = [
    # id, name, MW, stage, tnsp
    ("P01", "Larkspur Downs", 300, "R1 review", "TNSP-A"),
    ("P02", "Coolabah Flats", 180, "GPS negotiation", "TNSP-B"),
    ("P03", "Ironbark Hill", 420, "Commissioning", "TNSP-A"),
    ("P04", "Saltbush Plains", 240, "R2 validation", "TNSP-C"),
    ("P05", "Wattle Creek", 150, "Application", "TNSP-B"),
    ("P06", "Bluegum Ridge", 360, "Ongoing compliance", "TNSP-A"),
    ("P07", "Mulga Point", 210, "R1 review", "TNSP-C"),
    ("P08", "Quandong Rise", 270, "Enquiry", "TNSP-B"),
]
with open(OUT / "projects.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["project_id", "project_name", "capacity_mw", "stage", "tnsp"])
    w.writerows(projects)

people = [
    ("Mei", "Power system engineer"), ("Raj", "Power system engineer"),
    ("Elena", "Power system engineer"), ("Tom", "Power system engineer"),
    ("Aisha", "Grid lead"), ("Kofi", "Grid lead"),
]
# Typical weekly share of time per task code (fictional), by role.
mix = {
    "Power system engineer": {
        "STUDY-SETUP": 0.12, "STUDY-RUN": 0.08, "POSTPROC-PLOTS": 0.16,
        "REPORT-DRAFT": 0.14, "MODEL-DEV": 0.12, "COMMENT-RESP": 0.12,
        "DMAT": 0.05, "COMPLIANCE-TEST": 0.06, "KNOWLEDGE-SEARCH": 0.06,
        "MEETINGS": 0.06, "ADMIN": 0.03,
    },
    "Grid lead": {
        "CUST-COMMS": 0.16, "NSP-AEMO-COMMS": 0.16, "COMMENT-REGISTER": 0.15,
        "STATUS-REPORT": 0.13, "SCHEDULE-RISK": 0.10, "CONTRACT-REVIEW": 0.07,
        "KNOWLEDGE-SEARCH": 0.05, "MEETINGS": 0.13, "ADMIN": 0.05,
    },
}
# Which projects each stage keeps busy (more weight = more hours).
stage_weight = {"Enquiry": 0.5, "Application": 1, "GPS negotiation": 1.5, "R1 review": 2.5,
                "Commissioning": 2, "R2 validation": 1.5, "Ongoing compliance": 0.7}

rows = []
for week in range(1, 5):
    for name, role in people:
        total = random.choice([36, 38, 38, 40, 41])
        for code, share in mix[role].items():
            hours = total * share * random.uniform(0.75, 1.25)
            # Split each task's hours across up to 3 projects
            picks = random.choices(projects, weights=[stage_weight[p[3]] for p in projects], k=random.randint(1, 3))
            if code in ("ADMIN", "MEETINGS") and random.random() < 0.5:
                picks = [None]
            for p in picks:
                h = round(hours / len(picks) * 2) / 2  # half-hour resolution
                if h > 0:
                    rows.append([f"2026-W{week:02d}", name, role, p[0] if p else "GEN", code, h])
with open(OUT / "timesheet.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["week", "person", "role", "project_id", "task_code", "hours"])
    w.writerows(rows)

# Review-round comments: category mix shows failure demand (comments caused by our own gaps).
cats = [
    ("Model documentation inconsistent with model", 0.22),
    ("Missing or unclear study case", 0.18),
    ("Plot formatting or labelling", 0.12),
    ("GPS clause interpretation", 0.14),
    ("Parameter value query", 0.16),
    ("Request for additional study", 0.12),
    ("Typo or editorial", 0.06),
]
crow = []
cid = 0
for pid, name, mw, stage, tnsp in projects:
    rounds = {"R1 review": 2, "Commissioning": 3, "R2 validation": 3, "Ongoing compliance": 3}.get(stage, 0)
    for r in range(1, rounds + 1):
        n = int(random.uniform(30, 70) / r)
        for _ in range(n):
            cid += 1
            cat = random.choices([c for c, _ in cats], weights=[w for _, w in cats])[0]
            source = random.choice(["AEMO", tnsp, tnsp])
            repeat = "yes" if (r > 1 and random.random() < 0.22) or (r == 1 and random.random() < 0.08) else "no"
            hours = round(random.uniform(0.5, 6 if cat in ("Request for additional study", "Missing or unclear study case") else 3) * 2) / 2
            crow.append([f"C{cid:04d}", pid, r, source, cat, repeat, hours])
with open(OUT / "review_comments.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["comment_id", "project_id", "round", "source", "category", "repeat_of_earlier", "hours_to_close"])
    w.writerows(crow)
print(len(rows), "timesheet rows;", len(crow), "comments")
