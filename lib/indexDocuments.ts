import { qdrant } from "./qdrant";
import { getEmbedding } from "./embeddings";
import { chunkText } from "./chunk";
import { v4 as uuid } from "uuid";

export async function indexDocument(text: string) {
  const chunks = chunkText(text);

  for (const chunk of chunks) {
    const embedding = await getEmbedding(chunk);

    await qdrant.upsert("documents", {
      points: [
        {
          id: uuid(),
          vector: embedding,
          payload: {
            text: chunk,
          },
        },
      ],
    });
  }
}
