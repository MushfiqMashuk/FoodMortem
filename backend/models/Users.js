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
        id: Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

export default models.Users || model("Users", UsersSchema);
