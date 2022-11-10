// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Products from "../../backend/models/Products";

export default async function handler(req, res) {
  connectDB();
  const data = await Products.find();
  console.log(data);
  res.status(200).json(data[0].ratings[0].rating);
}
