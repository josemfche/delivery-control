import React from 'react'
import Link from 'next/link'
import PrivateRoute from '../components/PrivateRoute'
import AddDelivery from '../components/data/AddDelivery'
import DeliveriesList from '../components/data/DeliveriesList'
import SearchDelivery from '../components/data/SearchDelivery'
import { auth } from '../firebase'

export default function dashboard() {
    return (
        <PrivateRoute>
            <>
                <SearchDelivery />
                <DeliveriesList />
            </>
        </PrivateRoute >
    )
}
