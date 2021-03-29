const {User, Role, Sequelize:{ Op }} = require('../database/models/index')
const config = require("../config/auth.config")

const { sign } = require("jsonwebtoken")
const { hashSync, compareSync } = require("bcryptjs")

const signUp = async (req, res, next) => {
  // Save User to Database
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashSync(req.body.password, 8)
  })
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.status(200).send({ message: "User was registered successfully!" });
        })
      }).catch(err => next(err))
    } else {
      // user role = 2 = User. Hardcoded
      user.setRoles([2]).then(() => {
        res.status(200).send({ message: "User was registered successfully!" });
      })
    }
  })
  .catch(err => next(err))
  
};

const signIn = async (req, res, next) => {
  await User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    let authorities = [];
    user.getRoles({
      attributes: { exclude: ['userId'] }
    }).then(roles => {
      let token = sign({ id: user.id, role:roles[0].name }, config.secret, {
        expiresIn:  60 * 60 * 24 * 30 //30 days
      });
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      const { id, name, email } = user
      return res.status(200).send({
        id,
        name,
        email,
        roles: authorities,
        accessToken: `Bearer ${token}`
      })
    }).catch(err => next(err))
  })
  .catch(err => next(err));
};

module.exports = {
  signUp,
  signIn
};