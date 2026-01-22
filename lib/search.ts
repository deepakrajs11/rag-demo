import { qdrant } from "./qdrant";
import { getEmbedding } from "./embeddings";

export async function searchSimilar(question: string) {
  const queryEmbedding = await getEmbedding(question);

  const results = await qdrant.search("documents", {
    vector: queryEmbedding,
    limit: 3,
  });

  return results.map((r) => r.payload?.text as string);
}
