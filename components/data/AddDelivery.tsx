import { db, auth } from '../../firebase'
import { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ModalComponent from '../data/ModalComponent'
import { userContext } from '../../context/createContext/UserContext'

function AddDelivery(props) {

    const { userData } = useContext(userContext)

    //Modal control
    const [modalShow, setModalShow] = useState(false);


    interface IDeliveryObject {
        schema_version: string,
        delivery_man: string,
        date: Date | null,
        hour_completed: Date | null,
        price: string,
        delivery_zone: string,
        load_description: string,
        client: {
            type: string,
            name: string,
            tlf: string,
            email?: string
        },
        payment_method: string,
        completed: boolean,
        owner: string

    }

    const initialState: IDeliveryObject = {
        schema_version: "v0.1",
        delivery_man: "",
        date: new Date(Date.now()),
        hour_completed: null,
        price: "",
        delivery_zone: "",
        load_description: "",
        client: {
            type: "",
            name: "",
            tlf: "",
            email: ""
        },
        payment_method: "",
        completed: false,
        owner: auth.currentUser.displayName

    }

    const [data, setData] = useState(initialState)

    const onChange = (e) => {
        if (
            e.target.name == "email" ||
            e.target.name == "name" ||
            e.target.name == "tlf" ||
            e.target.name == "type"
        ) {
            setData({ ...data, "client": { ...data.client, [e.target.name]: e.target.value } })
        } else {
            setData({ ...data, [e.target.name]: e.target.value, "date": new Date(Date.now()) })
        }


        console.log(data.date)

    }

    const setCurrentDateOnState = () => {
        let dateS = new Date(Date.now())
        console.log(dateS)
        setData({ ...data, "date": dateS })

    }


    const onSubmit = (e) => {
        e.preventDefault();

        setCurrentDateOnState()

        db.collection("deliveries").add(data)
            .then((docRef) => {
                console.log("Document successfully written! ", docRef.id)
                setModalShow(true)
            })
            .catch(error => console.log(error))

        console.log("Fecha luego de guardar el documento: " + data.date)

    }

    return (
        <div className="" >
            <div className="container">
                <form onSubmit={onSubmit} className="row">
                    <div className="col-12 col-sm-6 mb-3" >
                        <div className="card">
                            <h4 className="m-3">Datos del delivery</h4>
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="">Precio del delivery $</label>
                                    <input className="form-control" value={data.price} name="price" onChange={onChange} type="number" required aria-required={true} />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="">Zona de entrega</label>
                                    <input className="form-control" required aria-required={true} value={data.delivery_zone} name="delivery_zone" onChange={onChange} type="text" />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="">Descripción de la carga</label>
                                    <input className="form-control" name="load_description" value={data.load_description} onChange={onChange} type="text" required aria-required={true} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6" >
                        <div className="form-group mb-3">
                            <div className="card">
                                <h4 className="m-3">Datos del cliente</h4>
                                <div className="form-group m-2 row">
                                    <div className="col-6"><label className="form-label" htmlFor="">Tipo de cliente</label>
                                        <select defaultValue={"Persona"} onChange={onChange} value={data.client.type} name="type" className="form-select" aria-label="Default select example" required aria-required={true}>
                                            <option value="Persona">Persona</option>
                                            <option value="Empresa">Empresa</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label" htmlFor="">Método de pago</label>
                                        <select defaultValue={"Cash"} onChange={onChange} value={data.payment_method} name="payment_method" className="form-select" aria-label="Default select example" required aria-required={true}>
                                            <option value="Cash">Cash</option>
                                            <option value="Zelle">Zelle</option>
                                            <option value="Pago Móvil">Pago Móvil</option>
                                            <option value="Transferencia">Transferencia</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group m-3">
                                    <label className="form-label" htmlFor="">Nombre</label>
                                    <input className="form-control" name="name" value={data.client.name} onChange={onChange} type="text" required aria-required={true} />
                                </div>
                                <div className="form-group m-3">
                                    <label className="form-label" htmlFor="">N° de teléfono</label>
                                    <input className="form-control" name="tlf" value={data.client.tlf} onChange={onChange} type="tel" required aria-required={true} />
                                </div>
                                <div className="form-group m-3">
                                    <label className="form-label" htmlFor="">Email</label>
                                    <input className="form-control" name="email" value={data.client.email} type="email" onChange={onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit" >Add Delivery</button>
                    </div >
                </form>
                <ModalComponent
                    show={modalShow}
                    data={data}
                    onHide={() => setModalShow(false)}
                    cleardata={() => setData(initialState)}
                />
            </div>
        </div >
    )
}

export default AddDelivery
