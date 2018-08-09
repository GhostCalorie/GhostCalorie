const router = require('express').Router()
const {Meal, MealItem, Food} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const meals = await Meal.findAll({})
    res.json(meals)
  } catch (err) {
    next(err)
  }
})


router.get('/byDay/:dayId', async (req, res, next) => {
  try {
    const meals = await Meal.findAll({
      where: {
        dayId: req.params.dayId
      }, include: [Food]

    })
    res.json(meals)
  } catch (err) {
    next(err)
  }
})


router.get('/:mealId', async (req, res, next) => {
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


//update quantity of item in a meal
router.put('/:mealId', async (req, res, next) => {
  try {

    const mealItem = await MealItem.findOne({where: {foodId: req.body.foodId, mealId: req.params.mealId}})
    await mealItem.update({quantity: req.body.quantity})


    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})


//add item to a meal
router.post('/:mealId', async (req, res, next) => {
  try {

    await MealItem.create({foodId: req.body.foodId, mealId: req.params.mealId})


    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//delete item from a meal
router.delete('/:mealId', async (req, res, next) => {
  try {

    await MealItem.destroy({where: {foodId: req.body.foodId, mealId: req.params.mealId}})


    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})


