// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import TopRated from "../../backend/models/TopRated";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      try {
        const product = await TopRated.create(req.body);
        const savedData = await product.save();
        res.status(200).json(savedData);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;

    case "GET":
      try {
        const data = await TopRated.find();
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;

    default:
      break;
  }
}
