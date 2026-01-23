import { chunkText } from "./chunk";
import { getEmbedding } from "./embeddings";
import { qdrant } from "./qdrant";
import { v4 as uuid } from "uuid";


interface IndexMeta {
  documentId: string;
  fileName: string;
}

export async function indexText(text: string, meta: IndexMeta) {
  const chunks = chunkText(text, 800);

  for (const chunk of chunks) {
    const embedding = await getEmbedding(chunk);

    await qdrant.upsert("documents", {
      points: [
        {
          id: uuid(),
          vector: embedding,
          payload: {
            text: chunk,
            documentId: meta.documentId,
            fileName: meta.fileName,
            createdAt: Date.now(),
          },
        },
      ],
    });
  }

  console.log(`✅ Indexed ${chunks.length} chunks for ${meta.fileName}`);
}

