const { Log } = require('../database/models');

const getAllLogs = async (req, res, next) => {
  await Log.findAll().then(logs => res.status(200).json({ logs }))
  .catch(next)
}

const createLog = (resource, action, userId, postId) => {
  return Log.create({
    resource,
    action,
    userId,
    postId
  })
}

module.exports = {
  getAllLogs,
  createLog
}