// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Brands from "../../../backend/models/Brands";

export default async function handler(req, res) {
  const { brandId } = req.query;
  connectDB();

  const data = await Brands.findById(brandId);

  res.status(200).json(data);
}
