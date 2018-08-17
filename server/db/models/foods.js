const Sequelize = require('sequelize')
const db = require('../db')

const Food = db.define('food', {
  brand_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty:true
    }
  },
  item_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty:true
    }
  },
  nf_calories: {
    type: Sequelize.INTEGER,
  },
  nf_sodium: {
    type: Sequelize.INTEGER,
  },
  nf_protein: {
    type: Sequelize.INTEGER,
  },
  nf_sugars: {
    type: Sequelize.INTEGER,
  },
  nf_total_carbohydrate: {
    type: Sequelize.INTEGER,
  },
  total_fat: {
    type: Sequelize.INTEGER,
  },
  nf_serving_size_unit: {
    type: Sequelize.STRING
  }

})

module.exports = Food

