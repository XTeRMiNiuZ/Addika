const { ctrlReview } = require('../controllers/index');
const { authJwt: { getPermission, verifyToken }, validator: { reviewValidationRules, validate } } = require("../middleware");

module.exports = (router) => {
  router.post(
    '/review', [
      reviewValidationRules(),
      validate
    ],
    ctrlReview.createReview
  )
  router.get(
    '/reviews', 
    [
      verifyToken,
      getPermission
    ], 
    ctrlReview.getAllReviews
  )
}