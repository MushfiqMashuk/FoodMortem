import { model, models, Schema } from "mongoose";

const BrandsSchema = new Schema(
  {
    name: {
      type: String,
      required: "Please provide a brand name",
      trim: true,
      unique: true,
    },

    categories: [String],

    restaurant: Boolean,

    img: String,
  },
  { timestamps: true }
);

export default models.Brands || model("Brands", BrandsSchema);
