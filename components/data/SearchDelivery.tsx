import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useState, useContext } from 'react'
import { userContext } from '../../context/createContext/UserContext'
import { db, auth } from '../../firebase'
import { GET_DELIVERIES, GET_SINGLE_DELIVERY } from '../../context/types'

function SearchDelivery() {

    interface IDeliveryObject {
        id: string,
        dateFrom: Date,
        dateTo: Date,
        limit: number,
        typeS: string,
        client?: {
            type?: string,
            tlf?: string,
            email?: string
        }

    }

    const initialState: IDeliveryObject = {
        id: "",
        dateFrom: new Date(Date.now()),
        dateTo: new Date(Date.now()),
        limit: 1,
        typeS: "allDeliveries",
        client: {}
    }



    const [data, setData] = useState(initialState)
    const { userDispatch } = useContext(userContext)


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

    const onSubmit = (e) => {
        e.preventDefault()


        const completados = () => {
            db.collection("deliveries")
                .where("completed", "==", true)
                .where("owner", "==", auth.currentUser.displayName)
                .limit(data.limit)
                .get()
                .then((querySnapshot) => {
                    const dataFormatted = querySnapshot.docs.map(item => {
                        return { id: item.id, data: item.data() }
                    })
                    userDispatch({
                        type: GET_DELIVERIES,
                        payload: dataFormatted
                    })
                })
                .catch(error => console.log(error))
        }

        const deliveryById = () => {
            db.collection("deliveries").doc(data.id)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        const dataFormatted = [{ id: doc.id, data: { ...doc.data() } }]
                        console.log(doc.data().date.valueOf())
                        console.log(doc.data().date.toDate())
                        userDispatch({
                            type: GET_SINGLE_DELIVERY,
                            payload: dataFormatted
                        })
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                })

        }


        const allDeliveries = () => {
            db.collection("deliveries")
                .limit(20)
                .where("owner", "==", auth.currentUser.displayName)
                .get()
                .then((querySnapshot) => {
                    console.log("All deliveries")
                    const dataFormatted = querySnapshot.docs.map(item => {
                        return { id: item.id, data: item.data() }
                    })
                    userDispatch({
                        type: GET_DELIVERIES,
                        payload: dataFormatted
                    })
                })
                .catch(error => console.log(error))

        }

        const searchToExecute = (type) => {
            const searchs = {
                allDeliveries: () => allDeliveries(),
                deliveryById: () => deliveryById(),
                completados: () => completados()
            }

            return searchs[type]()
        }

        searchToExecute(data.typeS)
    }

    return (
        <>
            <Container>
                <Form onSubmit={onSubmit} className="my-5 shadow p-3 mb-5 bg-body rounded">
                    <h4 className="my-2">Búsqueda</h4>
                    <Row>
                        <Form.Group sm={3} xs={12} as={Col} controlId="formGridEmail">
                            <Form.Label>ID</Form.Label>
                            <Form.Control onChange={onChange} name="id" type="text" placeholder="ID del delivery" />
                        </Form.Group>
                        <Form.Group sm={2} xs={12} as={Col} controlId="formGridEmail">
                            <Form.Label>Fecha desde</Form.Label>
                            <Form.Control onChange={onChange} name="dateFrom" type="date" placeholder="Enter date" />
                        </Form.Group>
                        <Form.Group sm={2} xs={12} as={Col} controlId="formGriddate">
                            <Form.Label>Fecha hasta</Form.Label>
                            <Form.Control onChange={onChange} name="dateTo" type="date" placeholder="Enter date" />
                        </Form.Group>
                        <Form.Group sm={2} xs={12} as={Col} controlId="formGridEmail">
                            <Form.Label>Resultados a mostrar</Form.Label>
                            <Form.Control onChange={onChange} value={data.limit} name="limit" min={1} type="number" placeholder="Introduzca cantidad límite" />
                        </Form.Group>
                        <Form.Group sm={2} xs={12} as={Col} controlId="exampleForm.SelectCustom">
                            <Form.Label>Tipo de búsqueda</Form.Label>
                            <select onChange={onChange} defaultValue="allDeliveries" name="typeS" className="form-select" aria-label="Default select example">
                                <option value="allDeliveries">Todos los deliveries</option>
                                <option value="deliveryById">ID</option>
                                <option value="completados">Completados</option>
                            </select>
                        </Form.Group>
                        <Form.Group className={"d-flex align-items-end justify-content-center mt-3 col-sm-1 col-12"} controlId="formGridEmail">
                            <Button className={"w-100"} type="submit" variant="primary" >Buscar</Button>
                        </Form.Group>
                    </Row>
                    <Row>

                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default SearchDelivery
