import axios from 'axios'
import history from '../history'

//ACTION TYPES
const CREATE_DAY = 'CREATE_DAY'

//INITIAL STATE

const initialState = {
    days: []
}

//ACTION CREATORS 

const createDay = day => ({type: CREATE_DAY, day})

//THUNK CREATORS

//POST to GC DB

export const postDay = (day) => async dispatch => {
    try {
        
        let res = await axios.post(`/api/day/`, day)
        dispatch(createDay(res.data))
    } catch(err) {
        return dispatch(createDay({error: err.message}))
    }
}

//REDUCER

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_DAY:
            return { ...state, days: action.day}
        default: 
            return state
    }
}