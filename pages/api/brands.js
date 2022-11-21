// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Brands from "../../backend/models/Brands";

export default async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    const brand = await Brands.create(req.body);
    const savedData = await brand.save();
    res.status(200).json(savedData);
  }
}
