import { connectDB } from "../db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const order = await req.json();
  const db = await connectDB();
  await db.collection("orders").insertOne({ ...order, status: "Pending" });
  return NextResponse.json({ message: "Order placed" });
}

export async function GET() {
  const db = await connectDB();
  const orders = await db.collection("orders").find().toArray();
  return NextResponse.json(orders);
}