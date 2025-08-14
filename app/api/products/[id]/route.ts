import { connectDB } from "../../db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = await connectDB();
    const body = await req.json();

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated" });
  } catch (error: any) {
    console.error("PATCH error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = await connectDB();
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}