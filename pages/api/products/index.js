// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Products from "../../../backend/models/Products";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      const product = await Products.create(req.body);
      const savedData = await product.save();
      res.status(200).json(savedData);
      break;
    case "GET":
      const data = await Products.find();
      console.log(data);
      res.status(200).json(data);
      break;
  }
}
