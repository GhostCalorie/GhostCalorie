import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_MEAL = 'GET_MEAL'

/**
 * ACTION CREATORS
 */
const gotMeals = meals => ({type: GET_MEAL, meals})

/**
 * THUNK CREATORS
 */
export const getMeals = () => dispatch => {
    axios
        .get(`/api/meals`)
        .then(({ data }) => {
            dispatch(gotMeals(data))
        }
        )
        .catch(error => console.error(error))
}
/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_MEAL:
      return action.meals
    default:
      return state
  }
}
