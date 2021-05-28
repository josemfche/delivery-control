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
            <div className="container-fluid">
                <Link href="/dashboard">
                    <a className="navbar-brand">Dashboard</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    {/*                     <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                    </ul> */}
                    <ul className="navbar-nav">
                        {
                            userData ?
                                <li className="nav-item d-flex justify-content-end">
                                    <span className="nav-link active" aria-current="page">Hello {userData.displayName}</span>
                                    <button className="btn btn-danger" onClick={() => auth.signOut()}>Sign Out</button>

                                </li> : <></>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavHeader
