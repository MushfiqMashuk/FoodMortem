// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Products from "../../backend/models/Products";
import calculateAverageRating from "../../helpers/calculateRating";

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
      // To update an existing user rating

      case "PUT":
        try {
          const result = await Products.findOneAndUpdate(
            { _id: req.body.productId, "ratings.userId": req.body.userId },
            {
              $set: { "ratings.$.rating": req.body.userRating },
            },
            { new: true }
          ).select({
            ratings: 1,
          });

          const averageRating = calculateAverageRating(result.ratings);

          await Products.findOneAndUpdate(
            { _id: req.body.productId },

            { averageRating: averageRating }
          );

          res.status(200).json(result);
        } catch (err) {
          res
            .status(500)
            .json({ error: { message: "Internal server error!" } });
        }
        break;

      // Add a user rating

      case "PATCH":
        try {
          const result = await Products.findOneAndUpdate(
            { _id: productId },
            { $push: { ratings: req.body } },
            { new: true }
          ).select({
            ratings: 1,
          });

          const averageRating = calculateAverageRating(result.ratings);

          await Products.findOneAndUpdate(
            { _id: productId },

            { averageRating: averageRating }
          );

          res.status(200).json(result);
        } catch (err) {
          res
            .status(500)
            .json({ error: { message: "Internal server error!" } });
        }
        break;

      // Remove a rating

      case "DELETE":
        try {
          const result = await Products.findOneAndUpdate(
            { _id: req.body.productId },
            { $pull: { ratings: { userId: req.body.userId } } },
            { new: true }
          ).select({
            ratings: 1,
          });

          const averageRating = calculateAverageRating(result.ratings);

          await Products.findOneAndUpdate(
            { _id: req.body.productId },

            { averageRating: averageRating }
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
