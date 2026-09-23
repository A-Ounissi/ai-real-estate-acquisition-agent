# Disclaimer — Please Read First

This repository is a **sanitized technical reconstruction**, not the original production codebase.

## What this is

In 2025, I designed and built an end-to-end AI automation system for a U.S. real-estate acquisition client. The system was a real, paid, production engagement — it ran live, processed real property data, made real outbound voice calls to homeowners, and handed accepted opportunities to the client for finalization.

Because the engagement was covered by an NDA, and because I did not retain any original project files, client data, credentials, prompts, documents, phone numbers, or production artifacts, **I cannot and do not publish the original system here.**

Instead, this repository documents the **architecture, workflow design, and technical patterns** of that system from memory, and demonstrates them using entirely **synthetic data** and **illustrative code**.

## What this is not

- ❌ This is not the client's original codebase, workflow export, or configuration.
- ❌ No property, homeowner, phone number, transcript, offer, or business data in this repo is real. All of it is fabricated for demonstration purposes.
- ❌ No formulas, qualification criteria, prompts, or schemas in this repo are the client's proprietary logic. Where the original details are no longer known to me, I have used clearly labeled illustrative placeholders — see `docs/production-vs-reconstruction.md`.
- ❌ This repo does not claim any specific business outcomes (deal counts, acceptance rates, revenue, ROI). I don't have those numbers, and I'm not going to invent them.
- ❌ I do not have and do not claim to have access to the live production system today. Development ended when the engagement did; the client continued operating and evolving the system independently.

## Why publish this at all

The goal is to demonstrate real experience designing multi-system, agentic AI automation — orchestration, deterministic business logic paired with LLM reasoning, RAG, voice AI, and human handoff — using a real project as the reference point, without violating confidentiality.

See `docs/production-vs-reconstruction.md` for a full breakdown of what's confirmed, what's inferred, and what's intentionally left out.