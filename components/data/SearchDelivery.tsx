import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

function SearchDelivery() {

    const [data, setData] = useState(null)

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

    return (
        <>
            <Container>
                <Form className="my-5 shadow p-3 mb-5 bg-body rounded">
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>ID</Form.Label>
                            <Form.Control onChange={onChange} name="id" type="email" placeholder="Enter email" />
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
                            <Button variant="primary" >Buscar</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default SearchDelivery
