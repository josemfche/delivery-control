import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import Router from 'next/router'

function PrivateRoute({ children }) {

    const [userData, setUserData] = useState(null)


    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("User signed ", user)
                setUserData(user)

            } else {
                console.log("Not user signed in")
                setUserData(null)
                Router.push("/login")
            }
        })

    }, [])


    if (!userData) {
        console.warn("Not Logged")
        return (
            <div className="d-flex flex-column justify-content-center w-100" style={{ width: "100vh", height: "100vh" }}>
                <div className="spinner-border text-warning m-auto" style={{ width: "5rem", height: "5rem", top: "50%" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute
