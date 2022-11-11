// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Products from "../../../backend/models/Products";

export default async function handler(req, res) {
  const { productId } = req.query;
  connectDB();

  const data = await Products.findById(productId);
  console.log(data);
  res.status(200).json(data);
}
