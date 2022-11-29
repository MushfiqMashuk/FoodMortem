// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Products from "../../../backend/models/Products";
import parseToInteger from "../../../helpers/parseToInteger";

export default async function handler(req, res) {
  const { brandId, categoryId, categoryName, limit } = req.query;

  connectDB();

  switch (req.method) {
    case "POST":
      const product = await Products.create(req.body);
      const savedData = await product.save();
      res.status(200).json(savedData);
      break;
    case "GET":
      if (brandId) {
        try {
          const data = await Products.find({ "brand.id": brandId }).sort({
            averageRating: "desc",
          });

          res.status(200).json(data);
        } catch (err) {
          res.status(500).json("Internal server error");
        }
      } else if (categoryId) {
        try {
          const data = await Products.find({ "category.id": categoryId }).sort({
            averageRating: "desc",
          });

          res.status(200).json(data);
        } catch (err) {
          res.status(500).json("Internal server error");
        }
      } else if (categoryName) {
        try {
          const data = await Products.find({
            "category.name": categoryName,
          })
            .sort({ averageRating: "desc" })
            .limit(8);

          res.status(200).json(data);
        } catch (err) {
          res.status(500).json("Internal server error");
        }
      } else if (limit) {
        try {
          const data = await Products.find().sort({ averageRating: "desc" }).limit(parseToInteger(limit));

          res.status(200).json(data);
        } catch (err) {
          res.status(500).json("Internal server error");
        }
      } else {
        try {
          const data = await Products.find().sort({ averageRating: "desc" });

          res.status(200).json(data);
        } catch (err) {
          res.status(500).json("Internal server error");
        }
      }

      break;
  }
}
