const router = require('express').Router()
const User = require('../db/models/user')
const Day = require('../db/models/day')
const Sequelize = require('sequelize')
const moment = require('moment')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {

      //upon login check if a day model has been created for this user on this day
      //if not create the day and associate it


      const todayDate = moment().format('YYYY[-]MM[-]DD')


      //search for todays date on a given user
      let today = await Day.findOne({
        where: {
          createdAtString: {[Sequelize.Op.iLike]: '%' + todayDate + '%'},
          userId: user.id
        }
      })


      //if the day doesnt exist make it an associate it
      if (!today) {
        today = await Day.create()

        user.addDay(today)

      }


      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)

//on signup auto create today
    const today = await Day.create()
    user.addDay(today)


    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
