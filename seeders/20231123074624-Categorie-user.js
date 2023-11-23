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
   let categorie = JSON.parse(fs.readFileSync("./data/categories.json", "utf-8"))
   categorie.forEach(element => {
    delete element.id 

    element.createdAt = new Date () 
    element.updatedAt = new Date ()
   });
   await queryInterface.bulkInsert('Categories', categorie)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
