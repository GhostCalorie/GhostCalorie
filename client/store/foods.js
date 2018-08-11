import axios from 'axios'
import { FoodForm } from '../components';


//ACTION TYPES

const GET_FOOD = 'GET_FOODS'
const GET_DB_FOOD = 'GET_DB_FOOD'
const ADD_FOOD = 'ADD_FOOD'
const UPDATE_FOOD = 'UPDATE_FOOD'

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

const getFood = food => ({ type: GET_FOOD, food })
const getDBFood = food => ({ type: GET_DB_FOOD, food })

const addFood = addedFood => ({ type: ADD_FOOD, addedFood })

const updateFood = updatedFood => ({
    type: UPDATE_FOOD,
    updatedFood
})
//THUNK CREATOR

//GET from GhostCalorie DB
export const fetchFood = () => async dispatch => {
    let res
    try {
        res = await axios.get('/api/food')
        dispatch(getFood(res.data))

    } catch (err) {
        return dispatch(getFood({ error: err.message }))
    }
}

//GET from Nutritionix DB, uses POST for GET

export const fetchDBFood = (query) => async dispatch => {
    try {
        console.log('storequery', query)
        let res = await axios.post('/api/food/nutritionix', { query })
        console.log('resdata', res.data)
        dispatch(getDBFood(res.data))
    } catch (err) {
        return dispatch(getDBFood({ error: err.message }))
    }
}

export const postFood = newFood => dispatch => {
    axios
        .post('/api/food', newFood)
        .then(({ data }) => {
            dispatch(addFood(data))
            history.push(`/food/${data.id}`)
        })
        .catch(error => console.error(error))
}

export const putFood = food => dispatch => {
    axios
        .put(`/api/food/${food.id}`, food)
        .then(({ data }) => dispatch(updateFood(data)))
        .catch(err => console.error(err))
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

        case ADD_FOOD:
            return {
                byId: { ...state.byId, [action.addedFood.id]: action.addedFood },
                allIds: [...state.allIds, action.addedFood.id]
            }
        case UPDATE_FOOD:
            return {
                byId: {
                    ...state.byId,
                    [action.updatedFood.id]: action.updatedFood
                },
                allIds: [...state.allIds]
            }
        default:
            return state
    }
}


