import connectDb from "../../../middlewares/db";
import QuizSet from "@/models/QuizSet";
import Response from "@/models/Response";
import jwtLogin from "@/middlewares/jwtLogin";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = req.quizUser;
    let { answers, quizSlug } = req.body; 
    let quizSet = await QuizSet.findOne({ slug: quizSlug });

    if (!quizSet)
      return res
        .status(404)
        .json({ success: false, error: "Quiz Not found" });

    if (!answers)
      return res
        .status(404)
        .json({ success: false, error: "Invalid Response" }); 

    if (quizSet.questions.length != answers.length)
      return res
        .status(404)
        .json({ success: false, error: "Quiz Not found" })
    
    let availableResponse = await Response.findOne({ user, quizSet });
    if (availableResponse)
      return res.status(409).json({ success: false, error: "Already Solved" })
    
    let { questions } = quizSet;
    let score = 0;
      
    for (let i = 0; i < quizSet.questions.length; i++) {
      answers[i].isCorrect = questions[i].correctOption == answers[i].option;
      if (answers[i].isCorrect) {
        score = score + questions[i].points;
      }
    }

    let response = new Response({ user, quizSet, answers, score })
    response.save();
    req.quizUser.quizSetSolved = req.quizUser.quizSetSolved + 1;
    req.quizUser.save();
    quizSet.noOfAttempts = quizSet.noOfAttempts + 1;
    quizSet.save();

    res.status(200).json({ success: true, msg: "Response Saved", score });
  } else {
    res.status(502).json({ success: false, error: "method not allowed" });
  }
};

export default connectDb(jwtLogin(handler));
