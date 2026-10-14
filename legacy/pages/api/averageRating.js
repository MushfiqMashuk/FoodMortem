// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Products from "../../backend/models/Products";

export default async function handler(req, res) {
  const { productId } = req.query;
  connectDB();

  if (req.method === "GET") {
    const product = await Products.findById(productId).select({
      averageRating: 1,
      ratings: 1,
    });
    res.status(200).json(product);
  }
}
