# Diagrams

Each `.mmd` file contains only Mermaid code, so GitHub renders it as a diagram when you open the file.

| File | What it shows |
|------|---------------|
| `high-level-architecture.mmd` | End-to-end pipeline: intake, qualification, calling, feedback loop |
| `qualification-workflow.mmd` | Qualification-to-offer stage |
| `call-flow.mmd` | Outbound voice call flow (Retell AI) |

## Notes on confidence

The branching logic and stage order are confirmed. Criteria, formulas and thresholds inside the boxes are synthetic. See [production-vs-reconstruction.md](../production-vs-reconstruction.md).

### call-flow.mmd
- Retry logic for unconnected calls is confirmed to have existed. The retry count and backoff strategy are not recalled and are left generic.
- The RAG lookup step is confirmed conceptually (Retell was connected to a RAG system for real-time context). The retrieval mechanism itself is inferred, not confirmed. See `src/rag/example_rag_retrieval.md`.
- The dialogue is not the client's actual call script. See `src/retell_call_flow/example_call_flow.md` for a synthetic version.

### qualification-workflow.mmd
- The pre-filter step reduces cost by removing obviously non-viable properties before the LLM runs. This is a common pattern, not a confirmed implementation detail.
- The "two offers" step is confirmed to have existed. The specific offer types and how they differ are not recalled.
- The calculation box uses a labeled synthetic formula. See `src/offer_calculation/example_offer_calculator.js`.

### high-level-architecture.mmd
- Built only from components that already appear in the two diagrams above. Adjust it if the real system had other pieces.