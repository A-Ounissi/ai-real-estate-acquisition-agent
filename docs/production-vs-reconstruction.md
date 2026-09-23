# Production System vs. This Reconstruction

This document draws a hard line between three categories: what I confirm actually happened in the 2025 production system, what is my reasonable architectural inference about how it likely worked, and what I no longer know and have deliberately not invented.

## 1. Confirmed — actually built and running in production (2025)

- Client: a U.S. real-estate acquisition business (client relationship kept unnamed here; see note below)
- Engagement window: approximately March–May 2025, paid, completed
- Purpose: automated identification and outreach to distressed/mortgage-struggling homeowners for acquisition offers
- Data source: Zillow, first via Apify scraping, later via official Zillow API access the client obtained
- Data staging: Zillow batches landed in Google Sheets, placed in the client's Google Drive
- Trigger: a new file appearing in Google Drive triggered n8n processing
- Duplicate prevention: properties already processed were checked and skipped
- Filtering: properties were filtered before deeper analysis
- Qualification: properties were analyzed against acquisition criteria the client provided personally, and classified as Qualified / Not Qualified
- Deterministic math: numeric offer calculations were done in JavaScript, specifically so the LLM was not responsible for producing exact numbers
- Offers: two offers were generated per qualified property
- Persistence: Supabase stored property, analysis, offer, qualification, and call-result data, and backed the RAG/knowledge system
- Voice AI: Retell AI placed real outbound calls to homeowners, confirmed the property, presented the offer, and captured accept/reject
- Branching outcome: accepted → appointment scheduled with the client; rejected → reason captured
- Reporting: the system generated documents (Google Docs and/or PDF) summarizing property, analysis, offer, qualification, and call outcome
- Delivery: the client received the reports/summaries by email
- Knowledge loop: transcripts, summaries, and documents were fed back into the RAG knowledge base so future calls had more context
- Orchestration: n8n, as multiple discrete workflows rather than one monolithic flow
- Make.com was present in the stack in some integration capacity
- Retry logic existed for calls
- Unipile was **not** part of this project (it belonged to a separate, unrelated client engagement)
- After delivery, the client continued operating and extending the system independently

## 2. Reasonable architectural inference (not confirmed — labeled as inference throughout this repo)

These are plausible, standard ways the confirmed behavior could have been implemented. They are *not* memories of the actual implementation, and the demo code in this repo treats them as illustrative design choices, not historical fact.

- Duplicate checks were likely keyed on a stable property identifier (e.g., address hash or listing ID) looked up in Supabase before further processing
- Cheap filtering rules likely ran before the more expensive LLM-based analysis step, to control cost
- OpenAI was likely used for unstructured reasoning tasks — analyzing property context and drafting report narrative — while JavaScript handled exact numeric output
- RAG was likely backed by vector embeddings of past transcripts/summaries, retrieved at call time and surfaced to the Retell agent as context
- Make.com's role was possibly related to document generation, notification formatting, or calendar/appointment scheduling — this is a guess, not a memory
- Appointment scheduling likely used a calendar integration of some kind — the specific tool is not recalled

## 3. Deliberately unknown — not invented anywhere in this repo

I no longer have access to the original implementation and will not fabricate specifics. The following are explicitly absent or replaced with clearly labeled placeholders:

- Exact Zillow data fields collected
- Exact qualification criteria and thresholds
- The two offer types' names and underlying logic
- Exact offer-calculation formulas
- Exact Supabase schema
- Exact OpenAI model version used at the time
- Exact Retell AI prompt/configuration
- Make.com's precise responsibility
- Exact report/document template
- Exact appointment-scheduling tool
- Any business outcomes: deal volume, acceptance rate, revenue, or ROI

Wherever a demo requires a stand-in for one of these (e.g., an offer formula to make the calculator module runnable), the code and docs explicitly label it, e.g.:

```js
// ILLUSTRATIVE ONLY — synthetic example formula for demonstration.
// This is NOT the client's proprietary calculation.
```

## A note on naming the client

This repository refers to the engagement generically as "a U.S. real-estate acquisition client" rather than naming the company or individual. The work was performed under NDA; even though some client details are publicly discoverable, the safer and more professional default is not to name the client in a public portfolio piece without their explicit sign-off.