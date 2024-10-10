import type { NextApiRequest, NextApiResponse } from "next";
import mongoose, { Error } from "mongoose";
import { User } from "@/models";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await mongoose.connect(
      "mongodb+srv://UserTestOdysseyDB:UfvxAuz4SgPqtsPo@testodyssey.vwr5s.mongodb.net/?retryWrites=true&w=majority&appName=TestOdyssey"
    );
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const userExists = await User.findOne({ email });
      const isNewUser = userExists ? false : true;
      const user = userExists ?? (await new User({ email }).save());

      const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      await sendVerificationEmail(email, token);

      res.status(201).json({
        message: isNewUser
          ? "User registered, please check your email to verify."
          : "User logged, please check your email to verify.",
      });
    } catch (error) {
      res.status(500).json({ message: (error as unknown as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
