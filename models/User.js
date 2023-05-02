const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quizSetSolved: {type : Number, default : 0},
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
