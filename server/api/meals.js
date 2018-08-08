const router = require('express').Router()
const {Meal, Food} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const meals = await Meal.findAll({})
    res.json(meals)
  } catch (err) {
    next(err)
  }
})



router.get('/:userId', async (req, res, next) => {
  try {
    const meals = await Meal.findAll({
      where: {
        userId: req.params.userId
      }, include: [Food]

    })
    res.json(meals)
  } catch (err) {
    next(err)
  }
})


router.get('/singleMeal/:mealId', async (req, res, next) => {
  try {
    const meal = await Meal.findOne({
      where: {
        id: req.params.mealId
      }, include: [Food]

    })
    res.json(meal)
  } catch (err) {
    next(err)
  }
})
