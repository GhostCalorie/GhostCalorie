import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_MEALITEM = 'GET_MEALITEM'
const ADD_MEALITEM = 'ADD_MEALITEM'
const UPDATE_MEALITEM = 'UPDATE_MEALITEM'
const DELETE_MEALITEM = 'DELETE_MEALITEM'

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

const updateMealItem = updatedMealItems => ({
  type: UPDATE_MEALITEM,
  updatedMealItems
})

const deleteMealItem = mealId => ({
  type: DELETE_MEALITEM,
  mealId
})

// THUNK CREATORS

export const getMealItems = () => dispatch => {
  axios
    .get('/api/mealItems')
    .then(({ data }) => {
      dispatch(gotMealItem(data))
    })
    .catch(error => console.error(error))
}

export const putMealItem = mealItem => dispatch => {
  axios
    .put(`/api/mealItems/${mealItem.id}`, mealItem)
    .then(({ data }) => {
      dispatch(updateMealItem(data)
      )
    })
    .catch(err => console.error(err))
}

export const delMealItem = (mealId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/mealItems/${mealId}`)

      dispatch(deleteMealItem(mealId))
    } catch (err) {
      console.log(err)
    }
  }
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
      return {
        ...state,
        byId: { ...state.byId, [action.addedMealItems.id]: action.addedMealItems },
        allIds: [...state.allIds, action.addedMealItems.id],
      }
    case UPDATE_MEALITEM:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.updatedMealItems.id]: action.updatedMealItems
        },
        allIds: [...state.allIds]
      }
    case DELETE_MEALITEM:
      return {
        ...state,
        byId: Object.values(state.byId).reduce((result, mealItem) => {
          if(mealItem.id !== action.mealId) result[mealItem.id] = mealItem
          return result
        }, {}),
        allIds: [...state.allIds]
      }
    default:
      return state
  }
}