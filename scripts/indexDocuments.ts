import { qdrant } from "@/lib/qdrant";
import { indexText } from "@/lib/indexDocuments";

async function run() {
  await qdrant.createCollection("documents", {
    vectors: { size: 1536, distance: "Cosine" },
  });

  await indexText(`
    RAG stands for Retrieval Augmented Generation...
  `);

  console.log("Indexing complete");
}

run();
