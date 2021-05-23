import {
    SET_USER,
    UNSET_USER,
    GET_DELIVERIES
} from '../types'

export default function userReducer(state, action) {
    switch (action.type) {
        case SET_USER:
            console.log("Funciona crack ", action.payload)
            return { ...state, user: action.payload }
        case UNSET_USER:
            console.log("UNSET")
            return { ...state, user: null }
        case GET_DELIVERIES:
            console.log("GET_DELIVERIES: ", action.payload)
            return { ...state, deliveries: action.payload }
        default:
            return state;
    }
}
