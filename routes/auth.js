const { verifySignUp, authJwt, validator: { userValidationRules, validate } } = require("../middleware");
const { ctrlAuth } = require("../controllers/index");

module.exports = (router) => {
  router.post(
    "/auth/signup",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      userValidationRules(),
      validate,
      verifySignUp.checkDuplicateEmail,
    ],
    ctrlAuth.signUp
  );

  router.post("/auth/signin", ctrlAuth.signIn);
};