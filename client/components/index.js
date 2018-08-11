/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllMeal} from './AllMeal'
export {default as AllFoods} from './AllFoods'
export {default as FoodForm} from './FoodForm'
export {default as AddFood} from './AddFood'
export {default as EditFood} from './EditFood'

export {Login, Signup} from './auth-form'
