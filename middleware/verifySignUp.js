const { User } = require('../database/models');
const ROLES = ["Admin", "User"];

const checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }
    next();
  }).catch(err => next(err));
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
      }
    }
  }
  next();
};

module.exports = {
  checkDuplicateEmail,
  checkRolesExisted
};