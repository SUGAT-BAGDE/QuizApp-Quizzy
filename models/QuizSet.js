import mongoose from "mongoose";
const { Schema } = mongoose;

const QuizSetSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "QuizCreator" },
    title : { type: String, required : true},
    topic : { type:String, required : true },
    slug : { type:String, required : true, unique : true, },
    questions: {
      type: [
        {
          question: { type: String, required: true },

          options: {
            type: [String],
            required : true,
            validator: [
              (arr) => arr.len >= 2 && arr.len <= 5,
              "Questions must have atleast 2 option and max 5 option",
            ],
          },

          correctOption: {
            type: Number,
            min: -1, // -1 stands for unattempted answer
            max: 4,
            required: true,
          },
          
          points : { type : Number, required : true} // index if correct option from above options array
        },
      ],
    },
    maxScore : { type: Number, min: 0, required: true },
    dateCreated: { type: Date, default: Date.now },
    noOfAttempts: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.QuizSet ||
  mongoose.model("QuizSet", QuizSetSchema);
