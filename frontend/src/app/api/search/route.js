import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { uri } from "../../dbConnection";

export async function GET(request) {
  const client = new MongoClient(uri);

  try {
    const database = client.db("akshay");
    const inventory = database.collection("inventory");

    const query = request.nextUrl.searchParams.get("query");
    const products = await inventory
      .aggregate([
        {
          $match: {
            $or: [
              { slug: { $regex: query, $options: "i" } },
              { quantity: { $regex: query, $options: "i" } },
              { price: { $regex: query, $options: "i" } },
            ],
          },
        },
      ])
      .toArray();
    return NextResponse.json({ success: true, products });
  } finally {
    await client.close();
  }
}
