import { model, models, Schema, Types } from "mongoose";

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: "Please provide a product name",
      trim: true,
    },
    brand: {
      id: Types.ObjectId,
      name: {
        type: String,
        trim: true,
      },
    },
    category: {
      id: Types.ObjectId,
      name: {
        type: String,
        trim: true,
      },
    },

    img: String,

    ratings: [
      {
        userId: Types.ObjectId,
        name: {
          type: String,
          trim: true,
        },
        rating: {
          type: Types.Decimal128,
          required: "Please provide an unbiased rating",
        },
      },
    ],

    reviews: [
      {
        userId: Types.ObjectId,
        name: {
          type: String,
          trim: true,
        },
        review: {
          type: String,
          trim: true,
          required: "Please provide an unbiased review",
        },
        type: {
          type: String,
          enum: ["good", "moderate", "bad"],
          required: "Please provide an appropriate review type",
        },
      },
    ],
  },
  { timestamps: true }
);

export default models.Products || model("Products", ProductsSchema);
