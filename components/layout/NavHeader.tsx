import { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { auth } from '../../firebase'

function NavHeader() {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("User signed Header", user)
                setUserData(user)

            } else {
                console.log("Not user signed in")
                setUserData(null)
                Router.push("/login")
            }
        })

    }, [])


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container justify-content-end">
                <div className="row w-100 collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="col" style={{ display: "flex !important", alignItems: "center", flexDirection: "row" }}>
                        <ul className="navbar-nav">
                            <li className="nav-item d-flex flex-row">
                                <a className="navbar-brand nav-link active" aria-current="page" href="/">DeliveryControl</a>
                                <Link href="/dashboard">
                                    <a className="nav-link active">Dashboard</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col" style={{ display: "flex !important", alignItems: "center", flexDirection: "row", justifyContent: "flex-end" }}>
                        <ul className="navbar-nav justify-content-end my-3">
                            {
                                userData ?
                                    <li className="nav-item d-flex">
                                        <span className="nav-link active" aria-current="page">Hola {userData.displayName}</span>
                                        <button className="btn btn-danger" onClick={() => auth.signOut()}>Cerrar sesión</button>

                                    </li> : <></>
                            }
                        </ul>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    )
}

export default NavHeader
