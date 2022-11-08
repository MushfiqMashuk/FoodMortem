import { model, models, Schema } from "mongoose";

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: "Please provide a product name",
      trim: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brands",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    img: String,
  },
  { timestamps: true }
);

export default models.Products || model("Products", ProductsSchema);
