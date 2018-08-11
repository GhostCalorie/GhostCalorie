const router = require('express').Router()
const {Food} = require('../db/models')
const request = require('request-promise-native')
module.exports = router

const createFoodFromJSON = body => ({
  name: '' + body.name,
  calories: +body.calories,
  description: '' + body.description
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
          "item_type"
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
          },
          "nf_calories": {
            "from": 0,
            "to": 400
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
    const food = await Food.create(req.body)

    res.json(food)
  } catch (err) {
    next(err)
  }
})

router
  .route('/:foodId')
  // .all(isAdmin)
  .put((req, res, next) => {
    if (req.body.id && +req.body.id !== +req.params.foodId) {
      next(new Error('Bad Request detected in PUT /:productId'))
    } else {
      Food.update(createFoodFromJSON(req.body), {
        where: {id: +req.params.foodId},
        returning: true
      })
        .spread(
          (done, updatedFood) =>
            done ? res.json(...updatedFood) : res.status(404).end()
        )
        .catch(next)
    }
  })