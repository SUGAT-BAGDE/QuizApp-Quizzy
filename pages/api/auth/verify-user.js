import User from '@/models/User';
const jwt = require('jsonwebtoken');
import QuizCreator from '@/models/QuizCreator';
import connectDb from '@/middlewares/db';

const handler = async (req, res) => {
    try {
        let payload = jwt.verify(req.headers["xx-login-token"], process.env.SECRET_JWT_KEY)
        let user = await User.findOne({ email: payload.email })
        if (!user) {
            res.status(500).json({ status: "unavailable", error: "account not exists", solution: "log in to your account" })
            return
        }
        
        let data = { status: "available", email: payload.email, isCreator : false, name : user.name }
        let creator = await QuizCreator.findOne({user})
        if (creator) {
            data.isCreator = true
            data.creatorId = creator.creatorId
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        if (error.message == "jwt expired") {
            res.status(500).json({ status: "expired", solution: "log in to your account" })
        }
        else {
            res.status(500).json({ status: "unavailable", solution: "log in to your account", msg : error.message })
        }
    }
}

export default connectDb(handler)