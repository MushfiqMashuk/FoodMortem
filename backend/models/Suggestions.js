import { model, models, Schema } from "mongoose";

const SuggestionsSchema = new Schema({
  productName: {
    type: String,
    required: "Please provide a product name",
    trim : true
  },
  brandName: {
    type: String,
    required: "Please provide a brand name",
    trim : true
  },
  location: {
    type: String,
  },
}, {timestamps: true});

export default models.Suggestions || model('Suggestions', SuggestionsSchema);