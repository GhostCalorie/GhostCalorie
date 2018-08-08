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


router.get('/byDay/:dayId', async (req, res, next) => {
  try {
    const meal = await Meal.findOne({
      where: {
        dayId: req.params.dayId
      }, include: [Food]

    })
    res.json(meal)
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

router.put('/:mealId', async (req, res, next) => {
  try {

    let meal = await Meal.findOne({
      where: {
        id: req.params.mealId
      }, include: [Food]

    })


    if (req.body.foodItemsToRemove && req.body.foodItemsToRemove.length)
    {
      await req.body.foodItemsToRemove.forEach(async (itemID) => {
        const food = await Food.findOne({where: {id: itemID}})

        await meal.removeFood(food)


      })
  }



    if (req.body.foodItemsToAdd && req.body.foodItemsToAdd.length)
    {

      await req.body.foodItemsToAdd.forEach(async (itemID) => {
        const food = await Food.findOne({where: {id: itemID}})

        await meal.addFood(food)


      })
    }


     meal = await Meal.findOne({
      where: {
        id: req.params.mealId
      }, include: [Food]

    })



    res.json(meal)
  } catch (err) {
    next(err)
  }
})

