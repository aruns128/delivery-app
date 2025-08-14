import { connectDB } from "../../db";
import { NextResponse } from "next/server";

// Update order by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const db = await connectDB();

  const result = await db.collection("orders").updateOne(
    { _id: new (await import("mongodb")).ObjectId(id) },
    { $set: body }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Order updated" });
}

// Delete order by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const db = await connectDB();

  const result = await db.collection("orders").deleteOne({
    _id: new (await import("mongodb")).ObjectId(id),
  });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Order deleted" });
}
