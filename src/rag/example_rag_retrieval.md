# Example RAG Retrieval Architecture (Illustrative)

> **Note:** The retrieval mechanism described here is a **reasonable architectural inference**, not a confirmed memory of the exact production implementation. See `docs/production-vs-reconstruction.md`, section 2. What is confirmed: Retell AI was connected to a RAG system that let the voice agent pull relevant context in real time during calls, and that call transcripts/summaries/documents were fed back into the knowledge base afterward.

## Conceptual loop

```
Property data + analysis + prior call outcomes
        ↓
   Text chunked & embedded
        ↓
   Stored as vectors (e.g., Supabase + pgvector, illustrative)
        ↓
   At call time: Retell agent context needed
        ↓
   Query embedding generated for current situation
        ↓
   Similarity search against knowledge base
        ↓
   Top-N relevant chunks returned to agent as context
        ↓
   Agent uses context during live conversation
        ↓
   New transcript + summary generated after call
        ↓
   New chunks embedded and added to knowledge base
        ↓
   (loop repeats — future calls have more context)
```

## Illustrative retrieval function (pseudo-implementation)

```js
/**
 * ILLUSTRATIVE ONLY. Represents the conceptual shape of the retrieval
 * step described above. Not the client's actual RAG implementation,
 * embedding model, vector store, or retrieval logic.
 */
async function retrieveContext(query, vectorStore, topN = 5) {
  const queryEmbedding = await embed(query); // synthetic placeholder
  const results = await vectorStore.similaritySearch(queryEmbedding, topN);
  return results.map((r) => r.content);
}

/**
 * ILLUSTRATIVE ONLY. Represents feeding a completed call's outcome
 * back into the knowledge base for future retrieval.
 */
async function ingestCallOutcome(transcript, summary, vectorStore) {
  const chunks = chunkText(transcript + "\n\n" + summary); // synthetic placeholder
  for (const chunk of chunks) {
    const embedding = await embed(chunk);
    await vectorStore.upsert({ content: chunk, embedding });
  }
}
```

## What made this an "iterative" knowledge loop, not a static lookup

The confirmed behavior — call outcomes feeding back into the same knowledge base that future calls draw from — means the system's available context grew over the course of the engagement. This is accurately described as an **iterative RAG/knowledge-ingestion loop**. It should **not** be described as autonomous learning or model fine-tuning; nothing in what's confirmed suggests the underlying LLM itself was being retrained — only that its available retrieved context expanded over time.
