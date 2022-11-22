// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Categories from "../../backend/models/Categories";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "POST") {
    const category = await Categories.create(req.body);
    const savedData = await category.save();
    res.status(200).json(savedData);
  }
}
