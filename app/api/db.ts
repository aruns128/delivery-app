import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;
let client: MongoClient;

export async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("vegshop");
}
