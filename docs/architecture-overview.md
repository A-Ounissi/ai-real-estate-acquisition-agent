# Architecture Overview

This document walks through the pipeline stage by stage. Each section notes whether it reflects a **confirmed** production behavior or a **reconstructed/inferred** implementation detail. See [production-vs-reconstruction.md](./production-vs-reconstruction.md) for the full breakdown.

## 1. Data ingestion — *confirmed*

Property data originated from Zillow. Early in the engagement this was via Apify-based scraping; later the client obtained official Zillow API access, giving richer property data. Data was compiled into a Google Sheets file, which was placed in the client's Google Drive. A batch was typically on the order of ~200 properties.

## 2. Trigger — *confirmed*

n8n watched the client's Google Drive for new files. When a new Zillow batch appeared, it kicked off the processing workflow. This made the pipeline event-driven rather than scheduled/polled arbitrarily.

## 3. Duplicate check — *confirmed behavior, inferred mechanism*

**Confirmed:** the system checked whether a property had already been processed, to avoid duplicate work/duplicate outreach.

**Inferred:** this was likely implemented as a lookup against Supabase using a stable property identifier (address hash, Zillow ID, or similar). The exact key and lookup logic are not recalled and are not reproduced here — the demo module uses an illustrative identifier scheme.

## 4. Filtering — *confirmed*

Before deeper (and more expensive) analysis, properties passed through filtering logic. This is a common cost-control pattern in LLM-based pipelines: use cheap rules to eliminate obviously non-viable candidates before invoking the LLM.

## 5. Qualification against acquisition criteria — *confirmed behavior, criteria unknown*

Remaining properties were analyzed against acquisition criteria the client personally defined, and classified as **Qualified** or **Not Qualified**. The actual criteria (financial thresholds, distress signals, property characteristics, etc.) are not recalled and are intentionally not reconstructed. The demo qualification module uses a clearly synthetic, illustrative rule set.

## 6. Deterministic offer calculation — *confirmed behavior, formula unknown*

For qualified properties, two offers were generated. Critically, the exact numeric calculations were done in **JavaScript**, not left to the LLM — a deliberate design choice to prevent numeric hallucination. The LLM's role was reasoning and language generation, not arithmetic.

The original formulas are not recalled. The demo offer-calculation module uses an explicitly labeled synthetic formula for demonstration only.

## 7. Persistence layer — *confirmed behavior, schema unknown*

Supabase stored property records, analysis results, offers, qualification status, and call outcomes, and also backed the RAG knowledge system. The original schema is not recalled; the demo repo defines a clearly synthetic schema representing the same *shape* of data, not the original structure.

## 8. Report generation — *confirmed behavior, template unknown*

The system generated a document per property (Google Docs and/or PDF) summarizing property details, analysis, offer, qualification status, and eventual call outcome. The exact template is not recalled; the demo report follows a generic, reasonable structure.

## 9. Voice AI outreach — *confirmed*

Qualified properties with generated offers moved into the calling stage, handled by **Retell AI**. The voice agent:

1. Called the homeowner (number sourced from the Zillow/property record)
2. Confirmed it had reached the correct property/homeowner
3. Discussed the potential purchase
4. Presented the generated offer
5. Determined interest: accepted or rejected
6. On acceptance, triggered appointment scheduling with the client
7. On rejection, captured the stated reason

Retry logic existed for calls that didn't connect or complete. Call transcripts were generated and stored.

## 10. RAG knowledge loop — *confirmed behavior, implementation inferred*

Retell AI was connected to a RAG system so the voice agent could pull relevant context in real time during a call. Over time, transcripts, summaries, documents, and call outcomes were fed back into the knowledge base, so later calls had access to more accumulated context.

This is accurately described as an **iterative RAG/knowledge-ingestion loop** — not a claim of sophisticated autonomous learning. The underlying retrieval mechanism (likely vector embeddings against a store such as pgvector in Supabase) is inferred, not confirmed.

## 11. Outcome branching — *confirmed*

- **Accepted:** appointment scheduled with the client; result stored; report generated; client notified.
- **Rejected:** rejection and reason stored; report generated; client notified.

The specific appointment-scheduling tool used is not recalled.

## 12. Notification — *confirmed*

The client received automated emails containing the generated report/document and a summary of results.

## 13. Supporting integration layer (Make.com) — *confirmed presence, role unclear*

Make.com was part of the stack. Its exact responsibility (possibly document generation, notification formatting, or calendar integration) is not recalled with confidence and is not reconstructed here. It's labeled in the architecture as: *"Supporting integration layer — exact production responsibility not fully recalled."*

## 14. Orchestration philosophy — *confirmed*

The whole system was built as **multiple discrete n8n workflows** rather than one monolithic workflow — e.g., separate workflows for property processing, duplicate checking, qualification, offer calculation, calling/Retell integration, RAG updates, document generation, and notifications. This modularity made the system easier to debug and extend, and is reflected in the demo's `src/n8n_workflows/` representation.