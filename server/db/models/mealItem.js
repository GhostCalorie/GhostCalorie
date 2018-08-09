const Sequelize = require('sequelize')
const db = require('../db')
const Meal = require('./meal')
const Food = require('./foods')


const MealItem = db.define('mealItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }

})

const updateCalorieTotal = async mealItem => {

  const meal = await Meal.findOne({where: { id: mealItem.mealId},  include : [Food]})

  let calTotal = 0

  meal.dataValues.food.forEach((food) => {
    calTotal += food.dataValues.mealItem.dataValues.quantity* food.dataValues.calories

  })

  meal.update({calories: calTotal})


}

MealItem.afterUpdate(updateCalorieTotal)
MealItem.afterCreate(updateCalorieTotal)




module.exports = MealItem

