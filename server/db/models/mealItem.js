const Sequelize = require('sequelize')
const db = require('../db')

const MealItem = db.define('mealItem', {
 quantity : {
   type: Sequelize.INTEGER,
   defaultValue: 1
 }

})

module.exports = MealItem

