import { QdrantClient } from "@qdrant/js-client-rest";
const DB_URL = process.env.DB_URL
const API_KEY = process.env.QDRANT_API_KEY;
export const qdrant = new QdrantClient({
  url: DB_URL,
  apiKey: API_KEY,
});

