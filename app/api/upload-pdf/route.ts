export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { indexText } from "@/lib/indexDocuments";
import { getDocumentProxy, extractText } from "unpdf";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uint8 = new Uint8Array(buffer);

  // Load PDF with unpdf and extract text
  const pdf = await getDocumentProxy(uint8);
  const { text } = await extractText(pdf, { mergePages: true });

  if (!text || !text.trim()) {
    return Response.json(
      { error: "PDF has no readable text" },
      { status: 400 },
    );
  }

  await indexText(text);

  return Response.json({
    message: "PDF uploaded and indexed successfully",
  });
}
