---
title: "Retrieval: grounding at scale"
minutes: 10
---

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
