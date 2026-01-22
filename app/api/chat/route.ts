import { llm } from "@/lib/llm";
import { searchSimilar } from "@/lib/search";

export async function POST(req: Request) {
  const { question } = await req.json();

  const contextChunks = await searchSimilar(question);
  const context = contextChunks.join("\n");

  if (!context) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const message = {
          content: "No documents found. Please upload documents first.",
        };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(message)}\n\n`),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await llm.chat.completions.create({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content:
                "Answer only using the context provided. Be concise and accurate. For queries beyond the context, reply with I only reply with the available contexts and list the available contexts",
            },
            {
              role: "user",
              content: `Context:\n${context}\n\nQuestion:\n${question}`,
            },
          ],
          stream: true, // Enable streaming
          max_tokens: 1000,
          temperature: 0.7,
        });

        // Stream the response chunks
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            const data = { content };
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
            );
          }
        }

        // Send done signal
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        console.error("Streaming error:", error);
        const errorMessage = {
          content: "Error: Failed to generate response.",
        };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(errorMessage)}\n\n`),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
