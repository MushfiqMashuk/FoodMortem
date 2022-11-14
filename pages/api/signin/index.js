// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../backend/config/db";
import Users from "../../../backend/models/Users";
import { encryptPassword } from "../../../helpers/hashPassword";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      if (req.body.email && req.body.password) {
        try {
          const user = await Users.findOne({ email: req.body.email });

          // if the user exists
          if (user && user._id) {
            // matching the password
            console.log(user.password);
            console.log(encryptPassword(req.body.password));
            if (user.password === encryptPassword(req.body.password)) {
              res.status(200).json("Success");
            } else {
              res.status(401).json({
                error: {
                  message: "Incorrect Password! Please try a different one",
                },
              });
            }
          } else {
            res.status(401).json({
              error: {
                message:
                  "You are not a valid user. Please Signup to continue...",
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
