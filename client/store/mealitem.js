import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_MEALITEM = 'GET_MEALITEM'
const ADD_MEALITEM = 'ADD_MEALITEM'

/**
 * INITIAL STATE
 */
const defaultMealItem = {
  byId: {
    0: {
      id: 0,
      quantity: 0,
      mealId: 0,
      foodId: 0
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotMealItem = mealItems => {
  return {
    type: GET_MEALITEM,
    mealItems
  }
}

export const addMealItem = addedMealItems => {
  return {
    type: ADD_MEALITEM,
    addedMealItems
  }
}

// THUNK CREATORS

export const getMealItems = () => dispatch => {
  axios
    .get('/api/mealItems')
    .then(({data}) => {
      dispatch(gotMealItem(data))
    })
    .catch(error => console.error(error))
}

// REDUCER

export default function (state = defaultMealItem, action) {
  switch (action.type) {
    case GET_MEALITEM:
      const newState = {
        ...state,
        byId: action.mealItems.reduce((result, mealItem) => {
          result[mealItem.id] = mealItem
          return result
        }, {}),
        allIds: action.mealItems.map(mealItem => mealItem.id)
      }
      return newState;
    case ADD_MEALITEM:
    console.log('in the add meeal item')
    return {
        ...state,
        byId: { ...state.byId, [action.addedMealItems.id]: action.addedMealItems },
        allIds: [...state.allIds, action.addedMealItems.id],
      }
    default:
      return state
  }
}