import QuizCreator from "@/models/QuizCreator";
import QuizSet from "@/models/QuizSet";
import Response from "@/models/Response";
import connectDb from "@/middlewares/db";
import jwtLogin from "@/middlewares/jwtLogin";

const handler = async (req, res) => {
  const user = req.quizUser;

  const responses = JSON.parse(JSON.stringify(await Response.find({ user })));

  for (const response of responses) {
    delete response._id;
    delete response.__v;
    delete response.user;
    delete response.createdAt;
    delete response.updatedAt;
    delete response.answers;

    let quizId = response.quizSet;
    let quizSet = JSON.parse(JSON.stringify(await QuizSet.findById(quizId)));
    let creator = await QuizCreator.findById(quizSet.creator);

    response.quizSlug = quizSet.slug;
    response.quizTitle = quizSet.title;
    response.quizTopic = quizSet.topic;
    response.quizMaxScore = quizSet.maxScore;
    response.quizCreator = creator.creatorId;

    delete response.quizSet;
  }

  res.status(200).json({
    status: "success",
    data: responses,
  });
};

export default connectDb(jwtLogin(handler));
