const router = require('express').Router()
const {Meal, MealItem, Food} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const mealItems = await MealItem.findAll({})
    res.json(mealItems)
  } catch (err) {
    next(err)
  }
})

