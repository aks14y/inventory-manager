import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { uri } from "../../dbConnection";

export async function POST(request) {
  // Replace the uri string with your connection string.
  const { action, slug, initialQuantity } = await request.json();

  const client = new MongoClient(uri);

  try {
    const database = client.db("akshay");
    const inventory = database.collection("inventory");
    // Create a filter for movies with the title "Random Harvest"
    const filter = { slug: slug };
    /* Set the upsert option to insert a document if no documents match
        the filter */

    let newQuantity =
      action === "add"
        ? parseInt(initialQuantity) + 1
        : parseInt(initialQuantity) - 1;
    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };
    // Update the first document that matches the filter
    const result = await inventory.updateOne(filter, updateDoc);
    return NextResponse.json({
      success: true,
      message: `${result.matchedCount} docs affected`,
    });
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
