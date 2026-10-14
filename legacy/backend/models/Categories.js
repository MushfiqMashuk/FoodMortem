import { model, models, Schema } from "mongoose";

const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: "Please provide a category name",
      trim: true,
      unique: true,
    },

    img: String,
  },
  { timestamps: true }
);

export default models.Categories || model("Categories", CategoriesSchema);
