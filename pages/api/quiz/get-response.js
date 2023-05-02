import QuizSet from "@/models/QuizSet";
import Response from "@/models/Response";
import connectDb from "@/middlewares/db";
import jwtLogin from "@/middlewares/jwtLogin";

const handler = async (req, res) => {
  const user = req.quizUser;
  const { quizId } = req.body;

  const quizSet = await QuizSet.find({ slug: quizId });

  const response = await Response.findOne({ quizSet, user });

  if (!response) {
    return res.status(404).json({
      status: "error",
      message: "Response not found",
    });
  }

  const { answers, score, dateAttempted } = JSON.parse(
    JSON.stringify(response)
  );

  for (const answer of answers) {
    delete answer._id;
  }

  res.status(200).json({
    status: "success",
    data: {
      answers,
      score,
      dateAttempted,
    },
  });
};

export default connectDb(jwtLogin(handler));
