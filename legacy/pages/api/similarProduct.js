// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Products from "../../backend/models/Products";

export default async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const data = await Products.find({ tags: { $in: req.body.tags } });
      const filteredData = data.filter(
        (product) => product._id != req.body.productId
      );

      res.status(200).json(filteredData);
    } catch (err) {
      res.status(500).json({ error: { message: "Internal server error!" } });
    }
  }
}
