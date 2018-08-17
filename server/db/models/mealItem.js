const Sequelize = require('sequelize')
const db = require('../db')
const Food = require('./foods')
const Day = require ('./day')
const Meal = require('./meal')


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

}, {

  })

const updateMacroTotal = async mealItem => {
  let meal = await Meal.findOne({where: {id: mealItem.mealId}, include: [Food]})


  let calTotal = 0
  let carbTotal = 0
  let fatTotal = 0
  let proteinTotal = 0

  //goes through each food associated with a meal and sums the multiple of its quantity and calorie amt to get total cal of a meal
  if (meal) {
   
  meal.dataValues.food.forEach((food) => {
    calTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.nf_calories
    carbTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.nf_total_carbohydrate
    fatTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.total_fat
    proteinTotal += food.dataValues.mealItem.dataValues.quantity * food.dataValues.nf_protein


  })

  await meal.update({calories: calTotal, fat: fatTotal, carbs: carbTotal, protein: proteinTotal})

  const day = await Day.findOne({where : {id : meal.dayId, },  include :[Meal]})

console.log(day)

  let dayCalTotal = 0
  let dayCarbTotal = 0
  let dayFatTotal = 0
  let dayProteinTotal = 0

  day.dataValues.meals.forEach((meal)=>{

    dayCalTotal += Number(meal.dataValues.calories)
    dayCarbTotal += Number(meal.dataValues.carbs)
    dayFatTotal += Number(meal.dataValues.fat)
    dayProteinTotal+=Number( meal.dataValues.protein)


  })
  await day.update({calories: dayCalTotal, fat: dayFatTotal, carbs: dayCarbTotal, protein: dayProteinTotal})

  await meal.update({ calories: calTotal })

  }
}

MealItem.afterUpdate(updateCalorieTotal)
// MealItem.afterBulkUpdate(updateCalorieTotal)
MealItem.afterCreate(updateCalorieTotal)
// MealItem.afterBulkCreate(updateCalorieTotal)
MealItem.afterDestroy(updateCalorieTotal)
// MealItem.afterBulkDestroy(updateCalorieTotal)


}

MealItem.afterUpdate(updateMacroTotal)
MealItem.afterCreate(updateMacroTotal)
MealItem.afterDestroy(updateMacroTotal)


module.exports = MealItem

