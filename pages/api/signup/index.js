// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Users from "../../../backend/models/Users";
import { encryptPassword } from "../../../helpers/hashPassword";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      const { name, email, password } = req.body;

      if (name && email && password) {
        const encryptedPassword = encryptPassword(password);

        try {
          const user = await Users.create({
            ...req.body,
            password: encryptedPassword,
          });
          const savedData = await user.save();
          res.status(200).json(savedData);
          break;
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json({
          error: {
            message: "Please fillup all the fields!",
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
