import { chunkText } from "./chunk";
import { getEmbedding } from "./embeddings";
import { VectorItem } from "./vectorStore";

export async function indexDocument(text: string) {
  const chunks = chunkText(text);
  const store: VectorItem[] = [];

  for (const chunk of chunks) {
    const embedding = await getEmbedding(chunk);
    store.push({ text: chunk, embedding });
  }

  return store;
}
