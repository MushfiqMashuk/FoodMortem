// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Brands from "../../backend/models/Brands";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      try {
        const brand = await Brands.create(req.body);
        const savedData = await brand.save();
        res.status(200).json(savedData);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case "GET":
      try {
        const brands = await Brands.find().select([
          "_id",
          "name",
          "img",
          "categories",
        ]);

        res.status(200).json(brands);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    default:
      break;
  }
}
