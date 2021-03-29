'use strict';
let models = require('./../models');
var bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      { name: 'Admin' },
      { name: 'User' }
    ], {});

    await queryInterface.bulkInsert('Users', [
      {
        name: 'administrator',
        email: 'test@test.com',
        password: bcrypt.hashSync('Password8<', 8)
      }
    ], {})

    await models.User.findOne({where: {name:'administrator'}})
    .then(async (user) => {
      await user.setRoles([1]).then(() => {
        console.log(" ============ all set successful ========== ")
      })
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
     await queryInterface.bulkDelete('Roles', null, {});
  }
};
