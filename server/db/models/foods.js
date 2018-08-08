const Sequelize = require('sequelize')
const db = require('../db')

const Food = db.define('food', {
  name: {
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

module.exports = Food

