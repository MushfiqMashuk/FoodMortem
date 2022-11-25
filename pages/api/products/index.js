// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Products from "../../../backend/models/Products";

export default async function handler(req, res) {
  const { brandId, categoryId } = req.query;

  connectDB();

  switch (req.method) {
    case "POST":
      const product = await Products.create(req.body);
      const savedData = await product.save();
      res.status(200).json(savedData);
      break;
    case "GET":
      if (brandId) {
        const data = await Products.find({ "brand.id": brandId });

        res.status(200).json(data);
      } else if (categoryId) {
        const data = await Products.find({ "category.id": categoryId });

        res.status(200).json(data);
      } else {
        const data = await Products.find();

        res.status(200).json(data);
      }

      break;
  }
}
