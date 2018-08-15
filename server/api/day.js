const router = require('express').Router()
const {Day, Meal} = require('../db/models')
module.exports = router

// MOUNT on '/api/day/'

// router.post('/', async (req, res, next) => {
//   try{
//     let day = await Day.create(req.body)
//     res.json(day)
//   } catch(err) {
//     next(err)
//   }
// })

router.get('/byUser/:userId', async (req, res, next) => {
  try {
    const days = await Day.findAll({where: {userId: req.params.userId}, include: [Meal]})
    console.log(days)
    res.json(days)
  } catch (err) {
    next(err)
  }
})

router.get('/:dayId', async (req, res, next) => {
  try {
    const day = await Day.findOne({
      where: {
        id: req.params.dayId
      }

    })
    res.json(day)
  } catch (err) {
    next(err)
  }
})



