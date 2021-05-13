import { db, auth } from '../../firebase'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/createContext/UserContext'

function AddDelivery(props) {

    const { userData } = useContext(userContext)

    interface IDeliveryObject {
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
        delivery_man: "",
        date: null,
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
            setData({ ...data, [e.target.name]: e.target.value })
        }
        console.log(data)

    }

    const setCurrentDateOnState = () => {
        let dateS = new Date(Date.now())
        setData({ ...data, "date": dateS })

    }

    const sendWhatsappMsj = () => {



    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Presionaste submit")
        setCurrentDateOnState()


        db.collection("deliveries").add(data)
            .then((docRef) => console.log("Document successfully written! ", docRef))
            .catch(error => console.log(error))

        db.collection("deliveries").where("owner", "==", "Yaneth").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
    }


    return (
        <div className="" >
            <div className="container">
                <form onSubmit={onSubmit} className="row">
                    <div className="col-12 col-sm-6" >
                        <div className="card">
                            <h4 className="m-3">Datos del delivery</h4>
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="">Precio del delivery $</label>
                                    <input className="form-control" name="price" onChange={onChange} type="number" />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="">Zona de entrega</label>
                                    <input className="form-control" name="delivery_zone" onChange={onChange} type="text" />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="">Descripción de la carga</label>
                                    <input className="form-control" name="load_description" onChange={onChange} type="text" />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6" >
                        <div className="form-group mb-3">
                            <div className="card">
                                <h4 className="m-3">Datos del cliente</h4>
                                <div className="card-body">
                                    <label className="form-label" htmlFor="">Tipo de cliente</label>
                                    <select onChange={onChange} name="type" className="form-select" aria-label="Default select example">
                                        <option selected value="Persona">Persona</option>
                                        <option value="Empresa">Empresa</option>
                                    </select>
                                </div>
                                <div className="form-group m-3">
                                    <label className="form-label" htmlFor="">Nombre</label>
                                    <input className="form-control" name="name" onChange={onChange} type="text" />
                                </div>
                                <div className="form-group m-3">
                                    <label className="form-label" htmlFor="">N° de teléfono</label>
                                    <input className="form-control" name="tlf" onChange={onChange} type="tel" />
                                </div>
                                <div className="form-group m-3">
                                    <label className="form-label" htmlFor="">Email</label>
                                    <input className="form-control" name="email" type="email" onChange={onChange} />
                                </div>
                                <div className="form-group m-3">
                                    <label className="form-label" htmlFor="">Método de pago</label>
                                    <select onChange={onChange} name="payment_method" className="form-select" aria-label="Default select example">
                                        <option value="Cash">Cash</option>
                                        <option value="Zelle">Zelle</option>
                                        <option value="Pago Móvil">Pago Móvil</option>
                                        <option value="Transferencia">Transferencia</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit" >Add Delivery</button>
                </form>
                <div className="btn btn-success mt-3">
                    <a className="text-white" href={`https://wa.me/${data.client.tlf}?text=${"Su pedido es: " + encodeURI(data.load_description) + " Para entregar en: " + data.delivery_zone}`} target="_blank">Send Whats</a>
                </div>
                <div className="btn btn-success mt-3">
                    <a className="text-white" href={`whatsapp://send?text=${"Supedidoes:" + encodeURI(data.load_description) + "Para entregaren:" + data.delivery_zone}`} data-action="share/whatsapp/share"
                        target="_blank">Send Whats share</a>
                </div>
            </div>
        </div>
    )
}

export default AddDelivery
