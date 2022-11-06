import { model, Schema } from "mongoose";

const SuggestionsSchema = new Schema({
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
});

export default model('Suggestions', SuggestionsSchema);