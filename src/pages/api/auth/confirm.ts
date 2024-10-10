import type { NextApiRequest, NextApiResponse } from "next";
import mongoose, { Error } from "mongoose";
import { User } from "@/models";
import jwt from "jsonwebtoken";
import { User as UserType } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await mongoose.connect(
      "mongodb+srv://UserTestOdysseyDB:UfvxAuz4SgPqtsPo@testodyssey.vwr5s.mongodb.net/?retryWrites=true&w=majority&appName=TestOdyssey"
    );
    try {
      const { confirmToken } = req.body;

      if (!confirmToken) {
        return res.status(400).json({ message: "Token is required" });
      }

      const { user } = jwt.decode(confirmToken) as { user: UserType };

      if (!user) {
        return res.status(400).json({ message: "Token was missing user" });
      }

      const userOnDB = await User.findOne<UserType>({ _id: user._id });

      if (!userOnDB) {
        return res.status(401).json({ message: "User not found" });
      }

      let resultUser;
      if (userOnDB.status === "pending") {
        resultUser = await User.findOneAndUpdate(
          { _id: user._id, status: "pending" },
          { $set: { status: "active" } },
          { new: true }
        );
      } else {
        resultUser = userOnDB;
      }

      const token = jwt.sign({ user: resultUser }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      res.status(201).json({ user: resultUser, token });
    } catch (error) {
      res.status(500).json({ message: (error as unknown as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
