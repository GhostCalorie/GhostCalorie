import axios from 'axios'
// import history from '../history'

//ACTION TYPES
// const CREATE_DAY = 'CREATE_DAY'
const GET_DAY = 'GET_DAY'

//INITIAL STATE

const initialState = {
    days: []
}

//ACTION CREATORS 

// const createDay = day => ({type: CREATE_DAY, day})
const getDay = day => ({type: GET_DAY, day})

//THUNK CREATORS

//POST to GC DB

// export const postDay = (day) => async dispatch => {
//     try {
        
//         let res = await axios.post(`/api/day/`, day)
//         dispatch(createDay(res.data))
//     } catch(err) {
//         return dispatch(createDay({error: err.message}))
//     }
// }

export const fetchDay = id => async dispatch => {
    try{
        let res = await axios.get(`/api/day/byUser/${id}`)
        dispatch(getDay(res.data))
    } catch(err) {
        return dispatch(getDay({error: err.message}))
    }
}

//REDUCER

export default function(state = initialState, action) {
    switch (action.type) {
        // case CREATE_DAY:
        //     return { ...state, days: action.day}
        case GET_DAY:
            return { ...state, days: action.day}
        default: 
            return state
    }
}