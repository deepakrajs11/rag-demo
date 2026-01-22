import { QdrantClient } from "@qdrant/js-client-rest";
const DB_URL = process.env.DB_URL || 'http://localhost:6333'
export const qdrant = new QdrantClient({
  url: DB_URL,
});
