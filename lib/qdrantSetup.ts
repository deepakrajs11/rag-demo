// lib/qdrantSetup.ts
import { qdrant } from "./qdrant";

export async function ensureDocumentsCollection() {
  const existing = await qdrant.getCollections();
  const collectionNames = existing.collections.map((c) => c.name);

  if (!collectionNames.includes("documents")) {
    // Correct signature: (name, config)
    await qdrant.createCollection("documents", {
      vectors: {
        size: 1536,
        distance: "Cosine",
      },
    });

    console.log("✅ 'documents' collection created");
  } else {
    console.log("Collection already exists:", collectionNames);
  }
}
