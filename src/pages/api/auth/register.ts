import type { NextApiRequest, NextApiResponse } from "next";
import mongoose, { Error } from "mongoose";
import { User } from "@/models";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      let isNewUser = false;
      let user = await User.findOne({ email });

      if (!user) {
        isNewUser = true;
        user = new User({ email });
        await user.save();
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const verificationUrl = `http://yourdomain.com/verify?token=${token}`;

      // Enviar email
      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Verify your email",
        html: `Please click this link to confirm your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
      });

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
