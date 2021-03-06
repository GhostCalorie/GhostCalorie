const router = require('express').Router()
module.exports = router

//MOUNTS on '/api/'

router.use('/users', require('./users'))
router.use('/food', require('./food'))
router.use('/meals', require('./meals'))
router.use('/mealItems', require('./mealItems'))
router.use('/day', require('./day'))



router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
