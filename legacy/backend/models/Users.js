import { model, models, Schema, Types } from "mongoose";

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
    bucketList: [
      {
        productId: Types.ObjectId,
        productName: {
          type: String,
          trim: true,
        },
        img: String,
        averageRating: { type: Number },
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
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default models.Users || model("Users", UsersSchema);
