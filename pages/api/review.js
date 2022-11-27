// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Products from "../../backend/models/Products";

export default async function handler(req, res) {
  const { productId } = req.query;

  const { cookies } = req;

  const jwt = cookies[process.env.NEXT_PUBLIC_COOKIE_NAME];

  connectDB();

  if (!jwt) {
    res.status(401).json({
      error: {
        message: "You are not a valid user. Please sign in first!",
      },
    });
  } else {
    switch (req.method) {
      case "PATCH":
        try {
          const result = await Products.findOneAndUpdate(
            { _id: productId },
            { $push: { reviews: req.body } },
            { new: true }
          );
          res.status(200).json(result);
        } catch (err) {
          res
            .status(500)
            .json({ error: { message: "Internal server error!" } });
        }
        break;
      default:
        break;
    }
  }
}
