import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import meals from './meal'
import foods from './foods'
import mealItems from './mealitem'
import days from './days'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({
  user, 
  foods, 
  meals, 
  mealItems,
  days,
  form: formReducer
})

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

