---
title: Your documents as a knowledge base
minutes: 10
---

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
