"use server";
import * as nodemailer from "nodemailer";
import { promises as fs } from "fs";
import * as handlebars from "handlebars";
import { TransportOptions } from "nodemailer";
import path from "path";

const loadTemplate = async (fileName: string) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "emails",
    fileName
  );
  try {
    const source = await fs.readFile(filePath, "utf8");
    return source;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

interface EmailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
} as TransportOptions);

async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  const source = await loadTemplate("verifyEmail.hbs");
  const template = handlebars.compile(source);
  const verificationUrl = `http://localhost:3000/confirmUser?token=${token}`;
  const htmlToSend = template({ verificationUrl });

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: htmlToSend,
  });
}

async function sendEmail(options: EmailOptions): Promise<void> {
  await transporter.sendMail({
    from: options.from ?? process.env.EMAIL_USERNAME,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

export { sendVerificationEmail, sendEmail };
