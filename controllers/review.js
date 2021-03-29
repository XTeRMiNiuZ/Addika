const { User, Review, Post, Sequelize:{ Op } } = require('../database/models');

const createReview = async (req, res, next) => {
  //check if postId exist
  await Post.findOne({
    where: {
      id: req.body.postId
    }
  })
  .then(async post => {
    if (post) {
      await Review.create(req.body)
      .then(
        (review) => res.status(200).json({review})
      )
      .catch(next);
    }
    return res.status(404).send({ message: "Post Not found." });
  })
  .catch(next)
  
}

const getAllReviews = async (req, res, next) => {
  try {
    if (req.roleName == "Admin") {
      await Review.findAll()
      .then(reviews => res.status(200).json({ reviews }))
      .catch(next)
    } else {
      await User.findOne({
        where: { id: req.userId }
      }).then(async user => {
        await user.getPosts({
          attributes: ["id"],
          raw: true
        })
        .then(async posts => {
          let postIds = []
          for (const post of posts) {
            postIds.push(Object.values(post))
          }
          await Review.findAll({
            where: {
              postId: {
                [Op.in]: postIds
              }
            }
          })
          .then(reviews => res.status(200).json({ reviews }))
          .catch(next)
        })
        .catch(next)
      })
      .catch(next)
    }
  } catch (error) {
    next(error)
  }
  
}

module.exports = {
  createReview,
  getAllReviews
}