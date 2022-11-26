// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../backend/config/db";
import Users from "../../backend/models/Users";

export default async function handler(req, res) {
  const { userId } = req.query;

  connectDB();

  switch (req.method) {
    case "PATCH":
      try {
        const result = await Users.findOneAndUpdate(
          { _id: userId },
          { $push: { bucketList: req.body } },
          { new: true }
        );
        const { password, ...data } = result._doc;
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;

    case "DELETE":
      try {
        const result = await Users.findOneAndUpdate(
          { _id: userId },
          { $pull: { bucketList: { productId: req.body.productId } } },
          { new: true }
        );

        const { password, ...data } = result._doc;
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }
      break;

    case "GET":
      try {
        console.log(userId);
        const result = await Users.findById(userId).select("bucketList");

        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: { message: "Internal server error!" } });
      }

    default:
      break;
  }
}
