// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Categories from "../../backend/models/Categories";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      try {
        const category = await Categories.create(req.body);
        const savedData = await category.save();
        res.status(200).json(savedData);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case "GET":
      try {
        const categories = await Categories.find().select([
          "_id",
          "name",
          "img",
        ]);

        res.status(200).json(categories);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    default:
      break;
  }
}
