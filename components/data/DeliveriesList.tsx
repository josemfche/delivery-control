import { db, auth } from '../../firebase'
import { useState, useEffect, useContext } from 'react'
import { userContext } from '../../context/createContext/UserContext'
import { GET_DELIVERIES } from '../../context/types'
import Link from 'next/link'
import { KeyObject } from 'tls'
import XLSX from 'xlsx'

function DeliveriesList() {

  const { userDispatch, deliveries, formatAMPM, xlsxDeliveries } = useContext(userContext)


  useEffect(() => {
    const fetchData = async () => {

      db.collection("deliveries")
        .limit(10)
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

    fetchData()

  }, [])



  return (
    <div className="container">
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
              <th scope="col">Hora</th>
            </tr>
          </thead>
          <tbody className="">
            {
              deliveries.map((item) => {
                let date = item.data.date ? item.data.date.toDate() : ""
                const dateFormatted = item.data.date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : ""
                return (
                  <tr key={item.id}>
                    <th scope="col" className="text-wrap" >{item.id}</th>
                    <th scope="col">{item.data.owner}</th>
                    <th scope="col">{item.data.load_description}</th>
                    <th scope="col">{item.data.client.name}</th>
                    <th scope="col">{item.data.completed ? "Completado" : "No completado"}</th>
                    <th scope="col">{dateFormatted ? dateFormatted : "No tiene fecha"}</th>
                    <th scope="col">{date ? formatAMPM(date) : "No tiene hora"}</th>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
      <div className="my-2">
        <Link href="/add-delivery" >
          <a className="btn btn-primary rounded-circle" style={{
            position: "fixed",
            right: "3%",
            bottom: "2%",
            textAlign: "center",
            boxShadow: "0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%)",
            cursor: "pointer"
          }}><i className="bi bi-plus" style={{ fontSize: "1.5rem", color: "#ffffff" }}></i></a>
        </Link>
      </div>
      <div className="my-2">
        <button onClick={() => xlsxDeliveries(deliveries)} className="btn btn-success rounded-circle" style={{
          position: "fixed",
          right: "3%",
          bottom: "10%",
          textAlign: "center",
          boxShadow: "0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%)",
          cursor: "pointer"
        }}><i className="bi bi-download" style={{ fontSize: "1.5rem", color: "#ffffff" }}></i>
        </button>
      </div>
    </div >
  )
}

export default DeliveriesList
