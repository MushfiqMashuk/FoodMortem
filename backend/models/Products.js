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
        rating: Types.Decimal128,
      },
    ],

    reviews: [
      {
        userId: Types.ObjectId,
        name: {
          type: String,
          trim: true,
        },
        review: String,
        type: {
          type: String,
          enum: ["good", "moderate", "bad"],
        },
      },
    ],
  },
  { timestamps: true }
);

export default models.Products || model("Products", ProductsSchema);
