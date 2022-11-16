// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import connectDB from "../../../../backend/config/db";
import Users from "../../../../backend/models/Users";
import { comparePassword } from "../../../../helpers/hashPassword";

export default async function handler(req, res) {
  connectDB();

  switch (req.method) {
    case "POST":
      const { email, password } = req.body;

      console.log(email, password);

      if (email && password) {
        try {
          const user = await Users.findOne({ email: email });

          // if the user exists
          if (user && user._id) {
            // matching the password
            const isValidPassword = await comparePassword(
              password,
              user.password
            );
            if (isValidPassword) {
              // creating user object
              const userObject = {
                userId: user._id,
                userName: user.name,
                email: user.email,
                bucketList: user.bucketList,
              };

              // creating jsonwebtoken
              const token = jwt.sign(
                userObject,
                process.env.NEXT_PUBLIC_JWT_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRY, // 30 days,
                }
              );

              const serialised = serialize(
                process.env.NEXT_PUBLIC_COOKIE_NAME,
                token,
                {
                  secure: process.env.NODE_ENV !== "development",
                  sameSite: "strict",
                  maxAge: process.env.JWT_EXPIRY, // 30 days,
                  path: "/",
                  signed: true,
                }
              );
              // setting the cookie at the client end
              res.setHeader("Set-Cookie", serialised);

              res.status(200).json({ message: "Success!" });
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
