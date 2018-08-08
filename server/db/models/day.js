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
  const mealArr = await Promise.all([Meal.create({type: 'breakfast'}), Meal.create({type: 'lunch'}),
    Meal.create({type: 'dinner'}), Meal.create({type: 'snacks'})])

  console.log(Object.keys(day.__proto__))
  await day.setMeals(mealArr)


}

Day.afterCreate(setMeals)


module.exports = Day



