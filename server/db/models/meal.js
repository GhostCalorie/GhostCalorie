const Sequelize = require('sequelize')
const db = require('../db')
const MealItem = require ('./mealItem')
const Day = require ('./day')


const Meal = db.define('meal', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  calories: {
    type: Sequelize.INTEGER
  },


  protein: {
    type: Sequelize.DECIMAL
  },
  carbs: {
    type: Sequelize.DECIMAL
  },
  fat: {
    type: Sequelize.DECIMAL
  },
  description: {
    type: Sequelize.TEXT
  },
  createdAtString: {
    type: Sequelize.TEXT

  }

})





module.exports = Meal

