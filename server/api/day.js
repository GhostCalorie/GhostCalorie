const router = require('express').Router()
const {Day, Meal} = require('../db/models')
module.exports = router

// MOUNT on '/api/day/'

router.get('/byUser/:userId', async (req, res, next) => {
  try {
    const days = await Day.findAll({where: {userId: req.params.userId}, include: [Meal]})

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
    console.log('days singluar in backend', day)

    res.json(day)
  } catch (err) {
    next(err)
  }
})



