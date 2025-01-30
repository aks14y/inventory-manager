import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import {uri} from '../../dbConnection';

export async function GET(request) {

  const client = new MongoClient(uri);

  try {
    const database = client.db("akshay");
    const inventory = database.collection("inventory");

    const query = {};
    const products = await inventory.find(query).toArray();

    console.log(products);
    return NextResponse.json({ success: true, products });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  // Replace the uri string with your connection string.
  const body = await request.json();

  const client = new MongoClient(uri);

  try {
    const database = client.db("akshay");
    const inventory = database.collection("inventory");
    const product = await inventory.insertOne(body);

    console.log(product);
    return NextResponse.json({ product, ok: true });
  } finally {
    await client.close();
  }
}
