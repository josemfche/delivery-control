import React from 'react'
import Link from 'next/link'

const RowInfo = () => {
    return (
        <div className="container">
            <div className="row my-5 align-items-center">
                <div className="col">
                    <h2>Info 1</h2>
                    <p>Las partituras se han perdido, excepto el recitativo conocido como Lamento d'Arianna («Lamento de Ariadna»), que se ha conservado gracias a que Monteverdi lo publicó de forma independiente en diferentes versiones.
                        Este fragmento forma parte de las óperas más representativas del Barroco, es una de las piezas más influyentes en la obra lírica posterior, se convirtió en una obra musical de gran influencia y ha sido ampliamente imitado.
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
