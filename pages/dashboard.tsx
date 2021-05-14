import React from 'react'
import PrivateRoute from '../components/PrivateRoute'
import AddDelivery from '../components/data/AddDelivery'
import { auth } from '../firebase'

export default function dashboard() {
    return (
        <PrivateRoute>
            <>
                <h1>Dashboard</h1>
                <AddDelivery />
            </>
        </PrivateRoute>
    )
}