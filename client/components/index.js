/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllMeal} from './AllMeal'
export {default as AllFoods} from './AllFoods'
export {AddFormField, EditFormField} from './FoodForm'
export {default as AddFood} from './AddFood'
export {default as EditFood} from './EditFood'
export {default as Search} from './Search'
export {default as CalorieTracker} from './CalorieTracker'
export {default as Days} from './Days'
export {default as CalorieGraph} from './calorieGraph'
export {default as Reports} from './reports'


export {Login, Signup} from './auth-form'
