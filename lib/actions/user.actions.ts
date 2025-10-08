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
      .map((user) => {
        const id =
          typeof user.id === "string" && user.id.trim()
            ? user.id
            : user._id
            ? String(user._id)
            : "";
        return {
          id,
          email: String(user.email),
          name: String(user.name),
        };
      });
  } catch (error) {
    console.error("Error fetching user for news email!", error);
    return [];
  }
};
