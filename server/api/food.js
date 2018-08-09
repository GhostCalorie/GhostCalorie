const router = require('express').Router()
const {Food} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const foods = await Food.findAll({})
    res.json(foods)
  } catch (err) {
    next(err)
  }
})

router.get('/:foodId', async (req, res, next) => {
  try {
    const food = await Food.findOne({
      where: {
        id: req.params.foodId
      }

    })
    res.json(food)
  } catch (err) {
    next(err)
  }
})


//create a new food in the DB
router.post('/', async (req, res, next) => {
  try {
    await Food.create({name: req.body.name, calories: req.body.calories, description: req.body.description})

    res.json(food)
  } catch (err) {
    next(err)
  }
})
