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

  const meal = await Meal.findOne({where: {id: mealItem.mealId}, include: [Food]})

  let calTotal = 0


  //goes through each food associated with a meal and sums the multiple of its quantity and calorie amt to get total cal of a meal
  meal.dataValues.food.forEach((food) => {
    calTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.calories

  })

  meal.update({calories: calTotal})


}

MealItem.afterUpdate(updateCalorieTotal)
MealItem.afterCreate(updateCalorieTotal)
MealItem.afterDestroy(updateCalorieTotal)




module.exports = MealItem

