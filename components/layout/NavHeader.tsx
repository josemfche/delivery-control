import React from 'react'
import Link from 'next/link'
import { auth } from '../../firebase'

function NavHeader() {
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-inverse">
                        {
                            auth.currentUser ?
                                <li className="nav-item me-3 d-flex pull-right">
                                    <span className="nav-link active" aria-current="page">Hello {auth.currentUser.displayName}</span>
                                    <button className="btn btn-danger" onClick={() => auth.signOut()}>Sign Out</button>

                                </li>
                                :
                                <li className="nav-item">
                                    <Link href="/login" >
                                        <a className="nav-link active" aria-current="page">Login</a>
                                    </Link >
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavHeader
