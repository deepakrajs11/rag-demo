import OpenAI from "openai";
const WEB_URL = process.env.WEB_URL || 'http://localhost:3000' 
export const llm = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": WEB_URL,
    "X-Title": "RAG Demo",
  },
});
