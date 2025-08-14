import { connectDB } from "../../db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// PATCH: Update order by ID
export async function PATCH(
  req: Request,
  context: { params: any }
) {
  const { id } = await context.params; // ✅ await params
  const body = await req.json();
  const db = await connectDB();

  const result = await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Order updated" });
}

// DELETE: Delete order by ID
export async function DELETE(req: Request, context: { params: any }) {
  const { id } = await context.params; // ✅ await params
  const db = await connectDB();

  const result = await db.collection("orders").deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Order deleted" });
}
