const Sequelize = require('sequelize')
const db = require('../db')

const Meal = db.define('MealItem', {
  type: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty:true
    }
  },
  calories: {
    type: Sequelize.INTEGER,
  },
  description :{
    type: Sequelize.TEXT
  }

})

module.exports = Meal

