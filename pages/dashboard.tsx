import React from 'react'
import Link from 'next/link'
import PrivateRoute from '../components/PrivateRoute'
import AddDelivery from '../components/data/AddDelivery'
import DeliveriesList from '../components/data/DeliveriesList'
import { auth } from '../firebase'

export default function dashboard() {
    return (
        <PrivateRoute>
            <>
                <h1 className="text-center">Dashboard</h1>
                <DeliveriesList />
            </>
        </PrivateRoute >
    )
}
