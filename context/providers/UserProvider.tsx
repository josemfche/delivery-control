import { userContext } from '../createContext/UserContext'
import { useReducer } from 'react'
import userReducer from '../reducers/UserReducer'


function UserProvider(props) {

    const initialState = {
        user: null
    }

    const [userState, userDispatch] = useReducer(userReducer, initialState)


    return (
        <userContext.Provider value={{
            userData: userState.user,
            userDispatch
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserProvider
