const Sequelize = require('sequelize')
const db = require('../db')
const Meal = require('./meal')
const Food = require('./foods')
const moment = require('moment')

const Day = db.define('day', {

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

  currentWeight: {
    type: Sequelize.DECIMAL
  },

  description: {
    type: Sequelize.TEXT
  },

  createdAtString: {
    type: Sequelize.STRING,
    defaultValue: moment().format('YYYY[-]MM[-]DD')

  }


})


const setMeals = async day => {
  const mealArr = await Promise.all([
    Meal.create({type: 'Breakfast', createdAtString: day.createdAtString}),
    Meal.create({type: 'Lunch', createdAtString: day.createdAtString}),
    Meal.create({type: 'Dinner', createdAtString: day.createdAtString}),
    Meal.create({type: 'Snacks', createdAtString: day.createdAtString})])




  await day.setMeals(mealArr)


  for (let i = 55; i <= 62; i++) {
    day = await Day.findOne({where: {id: i}, include: [Meal]})


    day.dataValues.meals.forEach(async (meal) => {
      let calories = Math.ceil(Math.random() * 500)
      let carbs = Math.random() * 30
      let fat = Math.random() * 30
      let protein = Math.random() * 30


      await meal.update({calories: calories, protein: protein, carbs: carbs, fat: fat})


    })
  }
}


Day.afterCreate(setMeals)


module.exports = Day


