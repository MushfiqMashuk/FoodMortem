// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Products from "../../backend/models/Products";
import calculateAverageRating from "../../helpers/calculateRating";

export default async function handler(req, res) {
  const { productId } = req.query;

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

        const ratings = await Products.findById(req.body.productId).select({
          ratings: 1,
        });

        const averageRating = calculateAverageRating(ratings.ratings);

        await Products.findOneAndUpdate(
          { _id: req.body.productId },

          { averageRating: averageRating }
        );

        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;

    case "PATCH":
      try {
        const result = await Products.updateOne(
          { _id: productId },
          { $push: { ratings: req.body } }
        );

        const ratings = await Products.findById(productId).select({
          ratings: 1,
        });

        const averageRating = calculateAverageRating(ratings.ratings);

        await Products.findOneAndUpdate(
          { _id: productId },

          { averageRating: averageRating }
        );

        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;

    case "DELETE":
      try {
        const result = await Products.findOneAndUpdate(
          { _id: req.body.productId },
          { $pull: { ratings: { userId: req.body.userId } } }
        );

        const ratings = await Products.findById(req.body.productId).select({
          ratings: 1,
        });

        //console.log(ratings);

        const averageRating = calculateAverageRating(ratings.ratings);

        await Products.findOneAndUpdate(
          { _id: req.body.productId },

          { averageRating: averageRating }
        );

        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;
    default:
      break;
  }
}
