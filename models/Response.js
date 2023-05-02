import mongoose from "mongoose";
const { Schema } = mongoose;

const responseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    quizSet: { type: Schema.Types.ObjectId, ref: "QuizSet" },
    answers: {
      type: [
        {
          option: {
            type: Number,
            min: -1, // -1 stands for unattempted answer
            max: 4,
            required : true
          },
          isCorrect : {
            type : Boolean,
            required : true
          }
        },
      ],
    },
    score: { type: Number, required: true },
    dateAttempted: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Response ||
  mongoose.model("Response", responseSchema);
