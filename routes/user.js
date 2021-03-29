const { ctrlUser } = require("../controllers/index");
const { authJwt, validator: { userValidationRules, validate } } = require("../middleware");

module.exports = (router) => {
  router.get("/users", 
    [authJwt.verifyToken, authJwt.isAdmin],
    ctrlUser.getAllUsers
  );

  router.get(
    "/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    ctrlUser.getUserById
  );

  router.delete(
    "/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    ctrlUser.deleteUser
  )

  router.put(
    "/user/:id",
    [
      authJwt.verifyToken, 
      authJwt.isAdmin,
      userValidationRules(),
      validate
    ],
    ctrlUser.updateUser
  )
};