// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Products from "../../backend/models/Products";

export default async function handler(req, res) {
  const { userId, productId } = req.query;

  connectDB();

  switch (req.method) {
    case "PUT":
      try {
        const result = await Products.updateOne(
          { _id: req.body.productId, "ratings.userId": req.body.userId },
          {
            $set: { "ratings.$.rating": req.body.userRating },
          }
        );

        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;

    case "PATCH":
      break;

    case "GET":
      try {
        const result = await Products.find({
          _id: productId,
          "ratings.userId": userId,
        }).select("ratings.rating");
        console.log(result);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;
  }
}
