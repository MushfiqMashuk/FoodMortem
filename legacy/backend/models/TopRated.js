import { model, models, Schema, Types } from "mongoose";

const TopRatedSchema = new Schema(
  {
    productId: Types.ObjectId,
    name: {
      type: String,
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
    rating: { type: Number },
  },
  { timestamps: true }
);

export default models.TopRated || model("TopRated", TopRatedSchema);
