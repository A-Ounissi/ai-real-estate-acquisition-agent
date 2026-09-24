# Architecture Diagrams

Mermaid diagrams describing the reconstructed architecture of the AI acquisition automation system. GitHub renders each `.mmd` file as a diagram when opened.

| Diagram | Description |
|---------|-------------|
| [high-level-architecture.mmd](high-level-architecture.mmd) | End-to-end pipeline: intake, qualification and offers, outbound calling, storage and feedback |
| [qualification-workflow.mmd](qualification-workflow.mmd) | Qualification-to-offer stage: duplicate check, pre-filter, LLM analysis, offer generation |
| [call-flow.mmd](call-flow.mmd) | Outbound voice call flow with Retell AI, including retries, RAG lookup and outcome handling |

## About these diagrams

This repository is a sanitized reconstruction of a production system, built with synthetic data only. The branching logic and stage order in the diagrams are confirmed. The specific criteria, formulas and thresholds shown inside individual boxes are synthetic and illustrative. See [production-vs-reconstruction.md](../production-vs-reconstruction.md) for a full breakdown of what is confirmed and what is reconstructed.

## Notes per diagram

### high-level-architecture.mmd
- Assembled from the components shown in the qualification and call flow diagrams. The original system may have included additional components that are not represented here.

### qualification-workflow.mmd
- The pre-filter step reduces cost by removing clearly non-viable properties before the LLM runs. This is a common pattern and not a confirmed implementation detail.
- The two-offer step is confirmed to have existed. The specific offer types and how they differ are not documented.
- The calculation step uses a labeled synthetic formula. See `src/offer_calculation/example_offer_calculator.js`.

### call-flow.mmd
- Retry logic for unconnected calls existed in the original system. The retry count and backoff strategy are unspecified and shown generically.
- The RAG lookup step is confirmed conceptually: the voice agent was connected to a RAG system for real-time context. The retrieval mechanism itself is inferred. See `src/rag/example_rag_retrieval.md`.
- The dialogue is not the client's actual call script. See `src/retell_call_flow/example_call_flow.md` for a synthetic illustrative version.