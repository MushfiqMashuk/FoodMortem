import connectDB from "../../backend/config/db";
import Suggestions from "../../backend/models/Suggestions";

export default async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const suggestion = await Suggestions.create(req.body);
      const savedData = await suggestion.save();
      res.status(200).json(savedData);
    } catch (err) {
      res.status(500).json({
        error: {
          message:
            "Couldn't recieve your suggestion right now. Please try again later!",
        },
      });
    }
  }
}
