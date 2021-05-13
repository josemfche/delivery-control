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
        target: string,
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
        target: "",
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
                    <div className="col-6" >
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">price</label>
                            <input className="form-control" name="price" onChange={onChange} type="text" />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">delivery_zone</label>
                            <input className="form-control" name="delivery_zone" onChange={onChange} type="text" />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">load_description</label>
                            <input className="form-control" name="load_description" onChange={onChange} type="text" />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">target</label>
                            <input className="form-control" name="target" onChange={onChange} type="text" />
                        </div>
                    </div>
                    <div className="col-6" >
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">type</label>
                            <input className="form-control" name="type" onChange={onChange} type="text" />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">name</label>
                            <input className="form-control" name="name" onChange={onChange} type="text" />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">tlf</label>
                            <input className="form-control" name="tlf" onChange={onChange} type="text" />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">email</label>
                            <input className="form-control" name="email" type="email" onChange={onChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="">payment_method</label>
                            <input className="form-control" name="payment_method" onChange={onChange} type="text" />
                        </div>
                    </div>
                    <button type="submit" >Add Delivery</button>
                </form>
                <div>
                    <a href={`https://wa.me/${data.client.tlf}?text=${"Su pedido es: " + encodeURI(data.load_description) + " Para entregar en: " + data.delivery_zone}`} target="_blank">Send Whats</a>
                </div>
                <div>
                    <a href={`whatsapp://send?text=${"Supedidoes:" + encodeURI(data.load_description) + "Para entregaren:" + data.delivery_zone}`} data-action="share/whatsapp/share"
                        target="_blank">Send Whats share</a>
                </div>
            </div>
        </div>
    )
}

export default AddDelivery
