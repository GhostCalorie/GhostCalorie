const router = require('express').Router()
const {Meal, MealItem, Food} = require('../db/models')
module.exports = router

const createMealItemFromJSON = body => ({
  quantity: +body.quantity,
  mealId: +body.mealId,
  foodId: +body.foodId,
})

router.get('/', async (req, res, next) => {
  try {
    const mealItems = await MealItem.findAll({})
    res.json(mealItems)
  } catch (err) {
    next(err)
  }
})

router
  .route('/:mealItemId')
  // .all(isAdmin)
  .put(async (req, res, next) => {
    if (req.body.id && +req.body.id !== +req.params.mealItemId) {
      next(new Error('Bad Request detected in PUT /:foodId'))
    } else {
      const mealItemBody = createMealItemFromJSON(req.body)
      const mealItem = await MealItem.findOne({where: {foodId : mealItemBody.foodId , mealId : mealItemBody.mealId}})
      await mealItem.update({quantity : mealItemBody.quantity})
      res.json(mealItem)
      // MealItem.update(createMealItemFromJSON(req.body), {
      //   where: {id: +req.params.mealItemId},
      //   returning: true
      // })
      //   .spread(
      //     (done, updatedMealItem) => {
      //       done ? res.json(updatedMealItem[0]) : res.status(404).end()
      //     }
      //   )
      //   .catch(next)
    }
  })

  router.delete('/:mealItemId', async (req, res, next) => {
    const mealItemId = req.params.mealItemId;
    console.log('meal id in the route', mealItemId)
    const mealitem = await MealItem.findOne({where: {
      id: mealItemId
    }})
    await mealitem.destroy()
    .then()
    res.status(204).end();
  })