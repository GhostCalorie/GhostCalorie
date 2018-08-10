import axios from 'axios'


//ACTION TYPES

const GET_FOOD = 'GET_FOODS'

//INITIAL STATE

const initialState = {
    byId: {
        0: {
            id: 0,
            name: '',
            calories: '',
            description: 'Loading...'
        }
    }
}

//ACTION CREATORS

const getFood = food => ({type: GET_FOOD, food})

//THUNK CREATOR

export const fetchFood = () => async dispatch => {
    let res
    try {
        res = await axios.get('/api/food/')
        console.log('data in get food', res.data)
        dispatch(getFood(res.data))
    } catch(err) {
        return dispatch(getFood({error: err.message}))
    }
}

//REDUCER

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FOOD:
            return {
                byId: action.food.reduce((result, food) => {
                    result[food.id] = food
                    return result
                }, {})
            }
        default:
            return state
    }
}

//SELECTORS

//   export const getFoodsByMeal = (state, mealId) => {
//     return Object.values(state.foodMeals.byId).reduce(
//       (result, foodMeal) => {
//         if (foodMeal.mealId === mealId) {
//           result.push(state.foods.byId[foodMeal.mealId])
//         }
//         return result
//       },
//       []
//     )
//   }
