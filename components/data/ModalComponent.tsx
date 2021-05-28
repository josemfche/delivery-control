import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function ModalComponent(props) {

    const onClose = () => {
        props.onHide();
        props.cleardata();

    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Solicitud Procesada!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Los datos del delivery son: </h4>
                <br />
                <label><strong>Fecha: </strong></label>
                <p>{props.data.date ? props.data.date.toLocaleString() : ""}</p>
                <label><strong>Pedido: </strong></label>
                <p>{props.data.load_description}</p>
                <label><strong>Metódo de pago: </strong></label>
                <p>{props.data.payment_method}</p>
                <label><strong>Zona de entrega: </strong></label>
                <p>{props.data.delivery_zone}</p>
                <br />
                <label><strong>Datos de cliente: </strong></label>
                <p><strong>Nombre:</strong> {props.data.client.name}</p>
                <p><strong>tlf:</strong> {props.data.client.tlf}</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="btn btn-success d-none d-md-block">
                    <a className="text-white text-decoration-none" href={`https://wa.me/${props.data.client.tlf}?text=${"Su pedido es: " + encodeURI(props.data.load_description) + " Para entregar en: " + props.data.delivery_zone}`} target="_blank">Enviar <i className="bi bi-whatsapp" /></a>
                </div>
                <div className="btn btn-success d-block d-md-none">
                    <a className="text-white text-decoration-none"
                        href={`whatsapp://send?text=${"Fecha: " + props.data.date + "%0a%0a" + "Supedido es: " + encodeURI(props.data.load_description) + "%0a" + "Para entregaren: " + encodeURI(props.data.delivery_zone) + "%0a" + "Método de pago: " + encodeURI(props.data.payment_method) + "Nombre del cliente: " + props.data.client.name + "%0a%0a" + "Número del cliente: " + props.data.client.tlf + "%0a%0a"}`} data-action="share/whatsapp/share"
                        target="_blank">Compartir <i className="bi bi-whatsapp" /></a>
                </div>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent
