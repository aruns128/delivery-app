import { connectDB } from "../db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connectDB();
  const products = await db.collection("products").find().toArray();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const db = await connectDB();
  await db.collection("products").insertOne(body);
  return NextResponse.json({ message: "Product added" });
}
