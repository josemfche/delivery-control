import {
    SET_USER,
    UNSET_USER
} from '../types'

export default function userReducer(state, action) {
    switch (action.type) {
        case SET_USER:
            console.log("Funciona crack ", action.payload)
            return { ...state, user: action.payload }
        case UNSET_USER:
            console.log("UNSET")
            return { ...state, user: null }
        default:
            return state;
    }
}
