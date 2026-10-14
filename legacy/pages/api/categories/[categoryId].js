// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Categories from "../../../backend/models/Categories";

export default async function handler(req, res) {
  const { categoryId } = req.query;
  connectDB();

  const data = await Categories.findById(categoryId);

  res.status(200).json(data);
}
