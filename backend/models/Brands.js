import { model, models, Schema } from "mongoose";

const BrandsSchema = new Schema(
  {
    name: {
      type: String,
      required: "Please provide a brand name",
      trim: true,
    },

    categories: [String],

    img: String,
  },
  { timestamps: true }
);

export default models.Brands || model("Brands", BrandsSchema);
