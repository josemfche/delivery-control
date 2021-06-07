import React from 'react'
import Link from 'next/link'

const RowInfo = () => {
    return (
        <div className="container">
            <div className="row my-5 align-items-center">
                <div className="col">
                    <h2>Qué hace esta app?</h2>
                    <p>Es una app para el control de los deliveries que permite el registro detallado de cada uno de los deliveries
                        realizados por tu empresa, también permite exportar los deliveries a una hoja de excel.
                        Además puedes comunicar a tus repartidores que se ha solicitado un delivery por medio del botón de comnpartir
                        en Whatsapp que aparece luego de crear una nueva solicitud en la app.
                    </p>
                </div>
                <div className="col text-center">
                    <h2 className="my-3" >Registrate ahora!</h2>
                    <Link href="/register" >
                        <a className="btn btn-primary border border-white rounded text-decoration-none text-white py-1 px-3" >Has click aquí!</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RowInfo
