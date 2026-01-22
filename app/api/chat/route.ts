import { llm } from "@/lib/llm";
import { searchSimilar } from "@/lib/search";
import { indexDocument } from "@/lib/indexDocuments";
import { qdrant } from "@/lib/qdrant";

const DOCUMENT = `
RAG stands for Retrieval Augmented Generation.
It improves LLM answers by grounding them in external knowledge.
`;

let initialized = false;

async function init() {
  if (initialized) return;

  const collections = await qdrant.getCollections();
  const exists = collections.collections.some((c) => c.name === "documents");

  if (!exists) {
    await qdrant.createCollection("documents", {
      vectors: { size: 1536, distance: "Cosine" },
    });
    await indexDocument(DOCUMENT);
  }

  initialized = true;
}

export async function POST(req: Request) {
  await init();

  const { question } = await req.json();

  const contextChunks = await searchSimilar(question);
  const context = contextChunks.join("\n");

  const response = await llm.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      { role: "system", content: "Answer only using the context." },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  });

  return Response.json({
    answer: response.choices[0].message.content,
  });
}
