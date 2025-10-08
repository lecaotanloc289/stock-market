"use server";

import { Watchlist } from "@/database/models/watchlist.model";
import { connectToDatabase } from "@/database/mongoose";

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  if (!email) return [];
  try {
    const mongoose = await connectToDatabase();

    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDb connection not found");

    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return [];

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (error) {
    console.error("getWatchlistSymbolsByEmail error:", error);
    return [];
  }
}
