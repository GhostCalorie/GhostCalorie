import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import meal from './meal'
import foods from './foods'
import mealItem from './mealitem'
import days from './days'

const reducer = combineReducers({user, foods, meal, mealItem, days})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './meal'
export * from './foods'
export * from './mealitem'
export * from './days'

