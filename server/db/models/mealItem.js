const Sequelize = require('sequelize')
const db = require('../db')
const Meal = require('./meal')
const Food = require('./foods')


const MealItem = db.define('mealItem', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }

})

const updateMacroTotal = async mealItem => {

  const meal = await Meal.findOne({where: {id: mealItem.mealId}, include: [Food]})

  let calTotal = 0
  let carbTotal = 0
  let fatTotal = 0
  let proteinTotal = 0


  //goes through each food associated with a meal and sums the multiple of its quantity and calorie amt to get total cal of a meal
  meal.dataValues.food.forEach((food) => {
    calTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.nf_calories
    carbTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.nf_total_carbohydrate
    fatTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.total_fat
    proteinTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.nf_protein


  })

  await meal.update({calories: calTotal, fat: fatTotal, carbs: carbTotal, protein: proteinTotal})


}

MealItem.afterUpdate(updateMacroTotal)
MealItem.afterCreate(updateMacroTotal)
MealItem.afterDestroy(updateMacroTotal)


module.exports = MealItem

