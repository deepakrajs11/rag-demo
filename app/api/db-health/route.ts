import { NextRequest, NextResponse } from "next/server";
import { qdrant } from "@/lib/qdrant";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const collections = await qdrant.getCollections();

    return NextResponse.json({
      status: "ok",
      message: "Qdrant connected",
      collections: collections.collections.map((c) => c.name),
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Qdrant connection error:", err.message || err);
    return NextResponse.json(
      { status: "error", message: "Failed to connect to Qdrant" },
      { status: 500 },
    );
  }
}
