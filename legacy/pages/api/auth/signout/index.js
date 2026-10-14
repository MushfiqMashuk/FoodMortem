import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { cookies } = req;

    const jwt = cookies[process.env.NEXT_PUBLIC_COOKIE_NAME];

    if (!jwt) {
      return res.json({ message: "You are already not logged in..." });
    } else {
      const serialised = serialize(process.env.NEXT_PUBLIC_COOKIE_NAME, null, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);

      res.status(200).json({ message: "Successfuly logged out!" });
    }
  } else {
    res.status(405).json({
      error: {
        message: "Method not allowed!",
      },
    });
  }
}
