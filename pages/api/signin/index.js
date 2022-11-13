// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Users from "../../../backend/models/Users";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      try {
        const user = await Users.findOne({ email: req.body.email });

        // if the user exists
        if (user && user._id) {
          // matching the password
        } else {
          res.status(500).json({
            error: {
              message: "You are not a valid user. Please Signup to continue...",
            },
          });
        }

        break;
      } catch (err) {
        res.status(500).json({
          error: {
            message: err.message,
          },
        });
      }
    case "GET":
      //   if (brandId) {
      //     const data = await Products.find({ "brand.id": brandId });

      //     res.status(200).json(data);
      //   } else {
      //     const data = await Products.find();

      //     res.status(200).json(data);
      //   }

      break;
  }
}
