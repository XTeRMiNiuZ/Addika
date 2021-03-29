const { Post, Sequelize:{ Op } } = require('../database/models');
const { createLog } = require('./log')

const createPost = async(req, res, next) => {
  req.body.userId = req.userId
  await Post.create(req.body).then(async result => {
    if (result) {
      await createLog("Post", "Create", req.userId, result.id).catch(next)
      return res.status(200).json({
        post:result
      })
    }
    return res.sendStatus(500)
  }).catch(next);
}

const getAllPosts = async (req, res, next) => {
  let options = {
    order: [['createdAt', 'DESC']],
    raw: true
  }
  try {
    if (req.query.startDate && req.query.endDate) {
      options.where = {
        createdAt: {
          [Op.between]: [req.query.startDate, req.query.endDate]
        }
      }
    }
    await Post.findAll(options)
    .then(posts => {
      const aWeekAgo = 1000 * 60 * 60 * 24 * 7
      for (const key in posts) {
        if (Object.hasOwnProperty.call(posts, key)) {
          let element = posts[key];
          let createdAt = new Date(element.createdAt)
          if (((new Date) - createdAt) > aWeekAgo) {
            element.tag = "A week ago or more"
          }
        }
      }
      res.status(200).json({ posts })
    })
    .catch(next)
  } catch (error) {
    next(error)
  }
  
}

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params
    const postId = parseInt(id)
    await Post.findOne({
      where: { id: postId }
    }).then(post => {
      if (post) {
        if (post.userId !== req.userId && req.roleName !== "Admin") {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        return res.status(200).json({ post })
      }
      return res.sendStatus(404)
    }).catch(next)
  } catch (error) {
    next(error)
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const postId = parseInt(id)
    await Post.findOne({
      where: { id: postId }
    }).then(async post => {
      if (post) {
        if (post.userId !== req.userId && req.roleName !== "Admin") {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        const updated = await Post.update(req.body, {
          where: {id: postId}
        }).catch(next)
        if (updated) {
          await createLog("Post", "Update", req.userId, postId).catch(next)
          const updatedPost = await Post.findOne(
            {where: {id: postId}}
          ).catch(next)
          return res.status(201).json({ post: updatedPost })
        }
        return res.sendStatus(404)
      }
      return res.sendStatus(404)
    }).catch(next)
  } catch (error) {
    next(error)
  }
  
}

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const postId = parseInt(id)
    await Post.findOne({
      where: { id: postId }
    }).then(async post => {
      if (post) {
        if (post.userId !== req.userId && req.roleName !== "Admin") {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        const deleted = await Post.destroy(
          { where: { id:postId } }
        ).catch(next)
        if (deleted) {
          await createLog("Post", "Delete", req.userId, postId).catch(next)
          return res.status(204).send("Post deleted!")
        }
        return res.sendStatus(404)
      }
      return res.sendStatus(404)
    }).catch(next)
  } catch (error) {
    next(error)
  }  
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
}