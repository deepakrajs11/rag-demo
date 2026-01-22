import { llm } from "@/lib/llm";
import { getEmbedding } from "@/lib/embeddings";
import { indexDocument } from "@/lib/indexDocuments";
import { searchSimilar } from "@/lib/vectorStore";

const DOCUMENT = `
RAG stands for Retrieval Augmented Generation.
It improves LLM answers by grounding them in external knowledge.
`;

const vectorStorePromise = indexDocument(DOCUMENT);

export async function POST(req: Request) {
  const { question } = await req.json();

  const vectorStore = await vectorStorePromise;

  const queryEmbedding = await getEmbedding(question);
  const results = searchSimilar(queryEmbedding, vectorStore);

  const context = results.map((r) => r.text).join("\n");

  const completion = await llm.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      {
        role: "system",
        content: "Answer only using the provided context.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  });

  return Response.json({
    answer: completion.choices[0].message.content,
  });
}
