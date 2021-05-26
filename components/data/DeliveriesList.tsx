import { db } from '../../firebase'
import { useState, useEffect, useContext } from 'react'
import { userContext } from '../../context/createContext/UserContext'
import { GET_DELIVERIES } from '../../context/types'
import Link from 'next/link'
import { KeyObject } from 'tls'

function DeliveriesList() {

  const [dataD, setData] = useState([])
  const { userDispatch, deliveries } = useContext(userContext)


  /*   useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await db.collection("deliveries").where("owner", "==", "Yaneth").limit(20).get()
          const dataFormatted = response.docs.map(item => item.data())
  
          userDispatch({
            type: GET_DELIVERIES,
            payload: dataFormatted
          })
  
        } catch (error) {
  
          console.error("Error getting documents: ", error);
  
        }
      }
  
      fetchData()
  
    }, []) */



  return (
    <div className="container">
      <div className="my-2">
        <Link href="/add-delivery" >
          <a className="btn btn-primary rounded-circle" style={{
            position: "fixed",
            right: "15px",
            bottom: "15px",
            textAlign: "center"
          }}><i className="bi bi-plus" style={{ fontSize: "1.5rem", color: "#ffffff" }}></i></a>
        </Link>
      </div>
      <div className="row table-responsive shadow mb-5 bg-body rounded mx-1">
        <table className="table table-striped table-hover table-borderless">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Empresa</th>
              <th scope="col">Descripción</th>
              <th scope="col">Nombre del cliente</th>
              <th scope="col">Completado</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody className="">
            {
              deliveries.map((item) => {
                let date = item.data.date ? item.data.date.toDate() : ""
                const dateFormatted = item.data.date ? `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}` : ""
                return (
                  <tr key={item.id}>
                    <th scope="col" className="text-wrap" >{item.id}</th>
                    <th scope="col">{item.data.owner}</th>
                    <th scope="col">{item.data.load_description}</th>
                    <th scope="col">{item.data.client.name}</th>
                    <th scope="col">{item.data.completed ? "Completado" : "No completado"}</th>
                    <th scope="col">{dateFormatted ? dateFormatted : "No tiene fecha"}</th>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div >
  )
}

export default DeliveriesList
