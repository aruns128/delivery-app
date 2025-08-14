import { connectDB } from "../db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connectDB();
  const products = await db.collection("products").find().toArray();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.formData();
  
  const imageFile = body.get("image") as File;
  let imageBase64 = "";

  if (imageFile) {
    const buffer = await imageFile.arrayBuffer();
    imageBase64 = Buffer.from(buffer).toString("base64");
  }

  const product = {
    name: body.get("name"),
    price: body.get("price"),
    description: body.get("description"),
    image: imageBase64, // Store as base64 string
    inStock: true,
    createdAt: new Date(),
  };

  const db = await connectDB();
  await db.collection("products").insertOne(product);

  return NextResponse.json({ message: "Product added" });
}

