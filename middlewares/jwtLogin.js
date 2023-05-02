import User from "../models/User";
const jwt = require("jsonwebtoken");

const jwtLogin = (handler) => async (req, res) => {
  /**
   * This is a middleware function that verifies a JWT token in the request header, finds the user
   * associated with the token, and passes the user object to the next handler function.
   * 
   * @param handler - The `handler` parameter is a function that will be called with the `req` and `res`
   * parameters once the JWT token has been verified and the user has been found in the database. It is a
   * callback function that will handle the actual logic of the endpoint that is being protected by the
   * JWT
   * 
   * @returns The function `jwtLogin` is returning an asynchronous function that takes in `req` and `res`
   * as parameters. This function verifies a JSON Web Token (JWT) from the request headers using a secret
   * key, finds a user with the email from the JWT payload in the database, sets the `quizUser` property
   * of the request object to the found user, and then calls the `handler`
   */
  
  try {
    /* This code is verifying a JSON Web Token (JWT) from the request headers using a secret key, and
    then finding a user with the email from the JWT payload in the database. */
    let payload = jwt.verify(
      req.headers["xx-login-token"],
      process.env.SECRET_JWT_KEY
    );
    let u = await User.findOne({ email: payload.email });
    if (!u) {
      res
        .status(500)
        .json({
          success: false,
          error: "account not exists",
          solution: "log in to your account",
        });
      return;
    }
    /* `req.quizUser = u;` is setting the `quizUser` property of the `req` (request) object to the
        found user `u`. This allows the user object to be passed to the next handler function in the
        middleware chain, which can then use the user object to perform further actions or
        validations. */
    req.quizUser = u;
    return handler(req, res);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: error.message,
        solution: "log in to your account",
      });
  }
};

export default jwtLogin;
