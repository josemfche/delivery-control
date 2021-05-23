import { userContext } from '../createContext/UserContext'
import { useReducer } from 'react'
import userReducer from '../reducers/UserReducer'


function UserProvider(props) {

    const initialState = {
        user: null,
        deliveries: []
    }

    const [userState, userDispatch] = useReducer(userReducer, initialState)



    return (
        <userContext.Provider value={{
            userData: userState.user,
            userDispatch,
            deliveries: userState.deliveries
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserProvider
