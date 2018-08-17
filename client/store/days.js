import axios from 'axios'
// import history from '../history'

//ACTION TYPES

const GET_DAY = 'GET_DAY'
const MY_DAY = 'MY_DAY'

//INITIAL STATE

const initialState = {
    days: [],
    myDay: []
}

//ACTION CREATORS 

// const createDay = day => ({type: CREATE_DAY, day})
const getDay = day => ({type: GET_DAY, day})
const myDay = day => ({type: MY_DAY, day})

//THUNK CREATORS

//POST to GC DB

export const fetchDay = id => async dispatch => {
    try{
        let res = await axios.get(`/api/day/byUser/${id}`)
        dispatch(getDay(res.data))
    } catch(err) {
        return dispatch(getDay({error: err.message}))
    }
}

//NOT REALLY THUNKY???

export const newDay = day => dispatch => {
    dispatch(myDay(day))
}

//REDUCER

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_DAY:
            return { ...state, days: action.day}
        case MY_DAY:
            return { ...state, myDay: action.day}
        default: 
            return state
    }
}