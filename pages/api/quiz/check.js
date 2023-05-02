import QuizSet from "@/models/QuizSet";
import Response from "@/models/Response";
import connectDb from "@/middlewares/db";
import jwtLogin from "@/middlewares/jwtLogin";

const handler = async (req, res) => {
  const user = req.quizUser;
  const { quizSlug } = req.body;

  const quizSet = await QuizSet.find({ slug: quizSlug });
  
  if (!quizSet) {
    return res.status(404).json({
      status: "error",
      message: "Quiz not found",
    });
  }

  let isSolved = false
  const response = await Response.findOne({ quizSet, user });

  if (response) {
    isSolved = true;
  }

  res.status(200).json({
    status: "success",
    isSolved
  });
};

export default connectDb(jwtLogin(handler));
