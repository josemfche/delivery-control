import PrivateRoute from '../components/PrivateRoute'
import AddDelivery from '../components/data/AddDelivery'
import { auth } from '../firebase'

export default function adddelivery() {
    return (
        <PrivateRoute>
            <>
                <h1 className="text-center">Registrar delivery</h1>
                <AddDelivery />
            </>
        </PrivateRoute >
    )
}
