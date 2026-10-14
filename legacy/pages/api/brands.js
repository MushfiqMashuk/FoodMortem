// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Brands from "../../backend/models/Brands";

export default async function handler(req, res) {
  const { categoryName } = req.query;

  connectDB();

  switch (req.method) {
    case "POST":
      try {
        const brand = await Brands.create(req.body);
        const savedData = await brand.save();
        res.status(200).json(savedData);
      } catch (err) {
        res.status(500).json("Internal server error!");
      }
      break;
    case "GET":
      if (categoryName && categoryName.length > 0) {
        try {
          const brands = await Brands.find({
            categories: {
              $in: categoryName,
            },
          }).select("name");

          res.status(200).json(brands);
        } catch (err) {
          res.status(500).json("Internal server error!");
        }
      } else {
        try {
          const brands = await Brands.find().select([
            "_id",
            "name",
            "img",
            "categories",
          ]);

          res.status(200).json(brands);
        } catch (err) {
          res.status(500).json("Internal server error!");
        }
      }
      break;
    default:
      break;
  }
}
