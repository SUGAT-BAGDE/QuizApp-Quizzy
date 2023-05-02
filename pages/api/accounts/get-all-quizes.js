import QuizCreator from "@/models/QuizCreator";
import QuizSet from "@/models/QuizSet";
import connectDb from "@/middlewares/db";
import jwtLogin from "@/middlewares/jwtLogin";

const handler = async (req, res) => {
  const user = req.quizUser;
  const creator = await QuizCreator.findOne({ user });

  if (!creator) {
    return res.status(404).json({
      status: "error",
      message: "You must be a creator",
    });
  }

  const quizes = JSON.parse(JSON.stringify(await QuizSet.find({ creator })));

  for (let quiz of quizes) {
    delete quiz.creator;
    delete quiz.updatedAt;
    delete quiz._id;
    delete quiz.__v;
    delete quiz.createdAt;
    delete quiz.questions;
  }

  res.status(200).json({
    status: "success",
    data: quizes,
  });
};

export default connectDb(jwtLogin(handler));
