'use strict';
let models = require('./../models');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let role = await models.Role.findOne({ 
      where: { name:'User' },
      attributes: { exclude: ['userId'] }
    })
    
    await queryInterface.bulkInsert('UserPermissions', [
      {
        roleId: role.id,
        resource: 'Post',
        action: 'Post',
        actionType: '/posts'
      },
      {
        roleId: role.id,
        resource: 'Post',
        action: 'Get',
        actionType: '/post/:id'
      },
      {
        roleId: role.id,
        resource: 'Post',
        action: 'Put',
        actionType: '/post/:id'
      },
      {
        roleId: role.id,
        resource: 'Post',
        action: 'Delete',
        actionType: '/post/:id'
      },
      {
        roleId: role.id,
        resource: 'Review',
        action: 'Get',
        actionType: '/reviews'
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UserPermissions', null, {});
  }
};
