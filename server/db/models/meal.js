const Sequelize = require('sequelize')
const db = require('../db')

const Meal = db.define('meal', {
  type: {
    type: Sequelize.STRING,
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

