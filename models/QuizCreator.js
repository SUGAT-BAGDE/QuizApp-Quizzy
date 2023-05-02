const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizCreatorSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    phone: {
      type: String,
      match: /^\+?[1-9][0-9]{7,14}$/,
    },
    mostCommonSubjectsInQuiz: { type: String },
    creatorId: { type: String, required: true, },
  },
  { timestamps: true }
);

export default mongoose.models.QuizCreator ||
  mongoose.model("QuizCreator", QuizCreatorSchema);
