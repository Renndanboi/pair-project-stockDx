'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let shoe = JSON.parse(fs.readFileSync("./data/shoes.json", "utf-8"))
   shoe.forEach(element => {
    delete element.id 
    element.createdAt = new Date ()
    element.updatedAt = new Date ()
   });
   await queryInterface.bulkInsert('Shoes', shoe);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Shoes', null, {})
  }
};
