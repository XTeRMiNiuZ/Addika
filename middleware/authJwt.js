const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { User, UserPermission } = require('../database/models');

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    req.roleName = decoded.role
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles({
      attributes: { exclude: ['userId'] }
    }).then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Admin") {
          return next();
        }
      }

      return res.status(403).send({
        message: "Require Admin Role!"
      });
    }).catch(err => next(err));
  }).catch(err => next(err));
};

const getPermission = async (req, res, next) => {
  //check if I have permission
  await User.findByPk(req.userId).then(async user => {
    await user.getRoles({
      attributes: { exclude: ['userId'] }
    }).then(async roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Admin") {
          return next();
        } else {
          let method_type = Object.keys(req.route.methods)[0]
          const userPermission = await UserPermission.findOne({ 
            where: {
              roleId: roles[i].id,
              actionType: req.route.path,
              action: (method_type.charAt(0).toUpperCase() + method_type.slice(1))
            },
            attributes: { exclude: ['postId'] },
            raw: true
          }).catch(next)
          if (userPermission) {
            return next();  
          } else {
            return res.status(403).send({
              message: "Require Permision!"
            });
          }
        }
      }
    }).catch(next);
  }).catch(next);

}

module.exports = {
  verifyToken,
  isAdmin,
  getPermission
};