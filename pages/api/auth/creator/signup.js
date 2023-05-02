import connectDb from "@/middlewares/db";
import jwtLogin from "@/middlewares/jwtLogin";
import QuizCreator from "@/models/QuizCreator";
import cryptoJs from "crypto-js";


/**
 * This is an async function that handles a POST request to create a new Quiz Creator, checking for
 * impurities in the request body and verifying the password before saving the new creator and
 * returning a success message.
 * 
 * @param req - `req` is an object that represents the HTTP request made to the server. It contains
 * information such as the request method, request headers, request body, and request parameters.
 * 
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods like `status` to set the HTTP status code, `json` to send a JSON
 * response, and `send` to send a plain text response.
 * 
 * @returns The function `handler` is not returning anything explicitly. It is sending a response to
 * the client using the `res` object. The response sent depends on the conditions met in the function.
 * If the request method is not POST, it sends a 502 error response. If any of the required fields in
 * the request body is missing, it sends a 500 error response. If the password in the
 */
const handler = async (req, res) => {
    if (req.method == 'POST') {
        let { password, phone, mostCommonSubjectsInQuiz, creatorId } = req.body;

        // Check for impurities in request body 
        if (!password || !phone || !mostCommonSubjectsInQuiz || !creatorId) {
            res.status(400).json({ success: false, message: "Please Fill all details" })
            return
        }

        /* This code is decrypting the `password` field of the `req.quizUser` object using the
        `crypto-js` library's AES decryption method. The decrypted password is then compared to the
        `password` field in the request body. If they do not match, a response with a 202 status
        code and an error message is sent back to the client indicating that the password is
        incorrect. */
        var bytes = cryptoJs.AES.decrypt(req.quizUser.password, process.env.SECRET_AES_KEY);
        var decryptedPassword = bytes.toString(cryptoJs.enc.Utf8);
        if (decryptedPassword != password)
            res.status(401).json({ success: false, error: "Password incorrect" })
        
        let creator = await new QuizCreator({ user: req.quizUser, phone, mostCommonSubjectsInQuiz, creatorId })
        creator.save()  
        
        res.status(201).json({ success: true, message: "Yeh! You can now Create Quiz Sets!" })
    } else {
        res.status(502).json({ success: false, error: "method not allowed" })
    }
};

export default connectDb(jwtLogin(handler));
