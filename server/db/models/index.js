const User = require('./user')
const Food = require('./foods')
const MealItem = require('./mealItem')


const Meal = require('./meal')
const Day = require('./day')





/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Day.hasMany(Meal)
Meal.belongsTo(Day)

Food.belongsToMany(Meal, {through : MealItem})
Meal.belongsToMany(Food, {through : MealItem})

User.hasMany(Day)
Day.belongsTo(User)

Meal.belongsTo(User)
User.hasMany(User)





/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Food, Meal, Day, MealItem
}
