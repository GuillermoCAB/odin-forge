import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (!req.body.email) {
        return res.status(400).json({ error: "Email is required" });
      }

      await fetch(
        "https://run.mocky.io/v3/6711fcff-806a-47eb-b73c-b0c6b7eb568e"
      );

      return res.status(200).json({});
    } catch (error) {
      console.error("Authentication error:", error);

      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }
}
