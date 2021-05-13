import { useEffect, useState } from 'react'
import { userContext } from '../context/createContext/UserContext'
import { auth } from '../firebase'

function PrivateRoute({ children }) {

    const [isLogged, setLogged] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("User signed ", user)
                setLogged(true)
            } else {
                console.log("Not user signed in")
                setLogged(false)

            }
        });

        return unsubscribe

    }, [auth.currentUser])

    if (isLogged == false) {
        console.warn("Is logged " + isLogged)
        return <h1>Not Logged</h1>
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute
