import { qdrant } from "./qdrant";

export async function createCollection() {
  await qdrant.createCollection("documents", {
    vectors: {
      size: 1536,
      distance: "Cosine",
    },
  });
}
