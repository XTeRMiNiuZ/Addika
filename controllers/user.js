const { User } = require('../database/models');

const getAllUsers = async (req, res, next) => {
  await User.findAll({raw: true}).then((users)=>{
    return res.status(200).json({ users: users.map(user => {
      const { password, ...restData } = user
      return restData
    }) })
  }).catch(next)
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = parseInt(id)
    if (userId !== req.userId && req.roleName !== "Admin") {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await User.findOne({
      where: { id: userId },
      raw: true
    }).then(user => {
      if (user) {
        const {password, ...restData } = user
        return res.status(200).json({ user: restData })  
      }
      return res.sendStatus(404)
    } )
    .catch(next)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = parseInt(id)

    await User.destroy(
      { where: { id:userId } }
    ).then(result => {
      if (result) {
        return res.status(204).send("User deleted!")
      }
      return res.sendStatus(400)
    }).catch(next)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = parseInt(id)

    const updated = await User.update(req.body, {
      where: {id: userId}
    }).catch(next)
    if (updated) {
      await User.findOne({
        where: { id: userId },
        raw: true
      }).then(user => {
        if (user) {
          const {password, ...restData } = user
          return res.status(201).json({ user: restData }) 
        }
        return res.sendStatus(404)
      } )
      .catch(next)
    }
    return res.sendStatus(404)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
}