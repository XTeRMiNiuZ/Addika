const { authJwt: {verifyToken, getPermission}, validator: {validate, postValidationRules} } = require("../middleware");
const { ctrlPost } = require('../controllers/index');

module.exports = (router) => {
  router.get('/posts', ctrlPost.getAllPosts)

  router.post(
    '/posts',
    [
      verifyToken,
      getPermission,
      postValidationRules(),
      validate
    ],
    ctrlPost.createPost
  )
  router.get(
    '/post/:id',
    [
      verifyToken,
      getPermission,
    ],
    ctrlPost.getPostById
  )
  router.put(
    '/post/:id', 
    [
      verifyToken,
      getPermission,
      postValidationRules(),
      validate
    ],
    ctrlPost.updatePost
  )

  router.delete(
    '/post/:id', 
    [
      verifyToken,
      getPermission
    ],
    ctrlPost.deletePost
  )
}