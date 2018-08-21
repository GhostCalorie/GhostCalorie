const router = require('express').Router()
const {Food, Meal, MealItem} = require('../db/models')
const request = require('request-promise-native')
module.exports = router

const createFoodFromJSON = body => ({
  brand_name: '' + body.brand_name,
  item_name: '' + body.item_name,
  nf_calories: +body.nf_calories,
  nf_protein: +body.nf_protein,
  nf_sodium: +body.nf_sodium,
  nf_sugars: +body.nf_sugars,
  nf_total_carbohydrate: +body.nf_total_carbohydrate,
  total_fat: +body.total_fat
})

router.get('/', async (req, res, next) => {
  try {
    const foods = await Food.findAll({})
    res.json(foods)
  } catch (err) {
    next(err)
  }
})


router.post('/nutritionix', async (req, res, next) => {
  try {
    const {query} = req.body
    const response = await request.post({
    url: 'https://api.nutritionix.com/v1_1/search',
    body:  {
      "appId": "623a35a9",
      "appKey": "59447ffa6f5b0a827dfa2ecca0fc3afc",
      "fields": [
          "item_name",
          "brand_name",
          "nf_calories",
          "nf_sodium",
          "nf_protein",
          "nf_sugars",
          "nf_total_carbohydrate",
          "total_fat",
          "nf_serving_size_unit"
        ],
        "offset": 0,
        "limit": 50,
        "sort": {
          "field": "nf_calories",
          "order": "desc"
        },
        "min_score": 0.5,
        "query": query,
        "filters": {
          "not": {
            "item_type": 2
          }
        }
    },
    json: true
  })
  res.send(response);
} catch(err){
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
    const food = await Food.create(req.body.newFood)



    const meal = await Meal.findById(req.body.mealId)
    await food.addMeal(meal, {through: {quantity: 1}})
    const mealItem = await MealItem.findOne({
      where: {
        foodId: food.id,
        mealId: meal.id
      }
    })
    // console.log('food in route', food)
    // console.log('meal item in route', mealItem)
    res.json({food, mealItem})
  } catch (err) {
    next(err)
  }
})

router
  .route('/:foodId')
  // .all(isAdmin)
  .put((req, res, next) => {
    if (req.body.id && +req.body.id !== +req.params.foodId) {
      next(new Error('Bad Request detected in PUT /:foodId'))
    } else {
      Food.update(createFoodFromJSON(req.body), {
        where: {id: +req.params.foodId},
        returning: true
      })
        .spread(
          (done, updatedFood) => {
            done ? res.json(updatedFood[0]) : res.status(404).end()
          }
        )
        .catch(next)
    }
  })
