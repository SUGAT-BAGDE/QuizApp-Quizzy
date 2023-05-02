import QuizCreator from "@/models/QuizCreator";
import connectDb from "@/middlewares/db";
import jwtLogin from "@/middlewares/jwtLogin";

const handler = async (req, res) => {
  const user = req.quizUser;
  const creator = JSON.parse(JSON.stringify(await QuizCreator.findOne({ user })));

  let data = {...(JSON.parse(JSON.stringify(user))), ...creator}

  delete data.password;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.__v;
  delete data._id;
  delete data.user;

  res.status(200).json({
    status: "success",
    data
  });
};

export default connectDb(jwtLogin(handler));
