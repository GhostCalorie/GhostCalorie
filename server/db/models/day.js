const Sequelize = require('sequelize')
const db = require('../db')
const Meal = require('./meal')

const Day = db.define('day', {

  calories: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  }

})


const setMeals = async day => {
  const mealArr = await Promise.all([Meal.create({
    type: 'Breakfast'
  }), Meal.create({ type: 'Lunch'}),
  Meal.create({
    type: 'Dinner'
  }), Meal.create({ type: 'Snacks' })])

  await day.setMeals(mealArr)


}

Day.afterCreate(setMeals)


module.exports = Day


