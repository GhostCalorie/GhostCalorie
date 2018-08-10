import axios from 'axios'


//ACTION TYPES

const GET_FOOD = 'GET_FOODS'
const GET_DB_FOOD = 'GET_DB_FOOD'

//INITIAL STATE

const initialState = {
    byId: {
        0: {
            id: 0,
            name: '',
            calories: '',
            description: 'Loading...'
        }
    },

    allIds: [],
    dbfoods: []

}

//ACTION CREATORS

const getFood = food => ({type: GET_FOOD, food})
const getDBFood = food => ({type: GET_DB_FOOD, food})

//THUNK CREATOR

//GET from GhostCalorie DB
export const fetchFood = () => async dispatch => {
    let res
    try {
        res = await axios.get('/api/food')
        dispatch(getFood(res.data))

    } catch(err) {
        return dispatch(getFood({error: err.message}))
    }
}

//GET from Nutritionix DB, uses POST for GET

export const fetchDBFood = (query) => async dispatch => {
    try {
        console.log('storequery', query)
        let res = await axios.post('/api/food/nutritionix', {query})
        console.log('resdata',res.data)
        dispatch(getDBFood(res.data))
    } catch (err) {
        return dispatch(getDBFood({error: err.message}))
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
        case GET_DB_FOOD:
            return {
                ...state,
                dbfoods: action.food
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
