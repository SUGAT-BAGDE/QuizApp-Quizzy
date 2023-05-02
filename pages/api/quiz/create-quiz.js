import connectDb from "../../../middlewares/db";
import QuizCreator from "@/models/QuizCreator";
import QuizSet from "@/models/QuizSet";
import jwtLogin from "@/middlewares/jwtLogin";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = req.quizUser;
    let creator = await QuizCreator.findOne({ user: user });

    if  (!creator) 
      return res.status(403).json({ success: false, error: "Forbidden" });
    
    console.log(creator)

    let quizSet = new QuizSet({
      creator: creator,
      slug : `${req.body.title.replaceAll(" ", "-")}-${req.body.topic.replaceAll(" ", "-")}-${creator.creatorId}`,
      title: req.body.title,
      topic: req.body.topic,
      questions: req.body.questions,
    });

    let maxScore = 0

    for (let question of quizSet.questions) {
      maxScore += question.points
    }

    quizSet.maxScore = maxScore

    quizSet.save()
    res
      .status(201)
      .json({ success: true, msg: "Great", creator: creator ? true : false, slug: quizSet.slug });
  } else {
    res.status(502).json({ success: false, error: "method not allowed" });
  }
};

export default connectDb(jwtLogin(handler));
