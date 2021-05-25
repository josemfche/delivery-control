import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useState, useContext } from 'react'
import { userContext } from '../../context/createContext/UserContext'
import { db, auth } from '../../firebase'
import { GET_DELIVERIES } from '../../context/types'

function SearchDelivery() {

    const [data, setData] = useState(null)
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

        console.log(data.limit)
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
                    const dataFormatted = querySnapshot.docs.map(items => items.data())
                    console.log("In place: ", dataFormatted)
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
                        const date = doc.data()
                        console.log(date.date.valueOf())
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                })

        }


        const allDeliveries = () => {
            db.collection("deliveries").limit(20).get()
                .then((querySnapshot) => {
                    const dataFormatted = querySnapshot.docs.map(item => item.data())
                    userDispatch({
                        type: GET_DELIVERIES,
                        payload: dataFormatted
                    })
                })
                .catch(error => console.log(error))

        }

        allDeliveries()
    }

    return (
        <>
            <Container>
                <Form onSubmit={onSubmit} className="my-5 shadow p-3 mb-5 bg-body rounded">
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>ID</Form.Label>
                            <Form.Control onChange={onChange} name="id" type="text" placeholder="ID del delivery" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Limite de resultados</Form.Label>
                            <Form.Control onChange={onChange} name="limit" type="number" placeholder="Introduzca cantidad límite" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Nombre del cliente</Form.Label>
                            <Form.Control onChange={onChange} name="email" type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Fecha desde</Form.Label>
                            <Form.Control onChange={onChange} name="dateFrom" type="date" placeholder="Enter date" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGriddate">
                            <Form.Label>Fecha hasta</Form.Label>
                            <Form.Control onChange={onChange} name="dateTo" type="date" placeholder="Enter date" />
                        </Form.Group>
                        {/*                         <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                            <Form.Label>Custom select</Form.Label>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </Form.Group> */}
                    </Row>
                    <Row className="my-2 d-flex flex-end">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Button type="submit" variant="primary" >Buscar</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default SearchDelivery
