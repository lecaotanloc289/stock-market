"use server";

import { connectToDatabase } from "@/database/mongoose";

export const getAllUserForNewsEmail = async () => {
  try {
    const mongoose = connectToDatabase();
    const db = (await mongoose).connection.db;
    if (!db) {
      throw new Error("Mongoose connection not connected!");
    }
    const users = await db
      .collection("user")
      .find(
        {
          email: { $exists: true, $ne: null },
        },
        {
          projection: { _id: 1, id: 1, name: 1, email: 1, country: 1 },
        }
      )
      .toArray();
    return users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        id: user.id || user._id.toString() || "",
        email: user.email,
        name: user.name,
      }));
  } catch (error) {
    console.error("Error fetching user for news email!", error);
    return [];
  }
};
