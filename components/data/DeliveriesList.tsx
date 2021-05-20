import { db } from '../../firebase'
import { useState, useEffect } from 'react'
import Link from 'next/link'

function DeliveriesList() {

  const [dataD, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await db.collection("deliveries").where("owner", "==", "Yaneth").limit(10).get()

        setData(response.docs)

      } catch (error) {

        console.error("Error getting documents: ", error);

      }
    }

    fetchData()

  }, [])



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
            </tr>
          </thead>
          <tbody className="">
            {dataD.map(item => {
              let itemData = item.data()
              return (
                <tr>
                  <th className="text-wrap" scope="col">{item.id}</th>
                  <th scope="col">{itemData.owner}</th>
                  <th scope="col">{itemData.load_description}</th>
                  <th scope="col">{itemData.client.name}</th>
                  <th scope="col">{itemData.completed ? "Completado" : "No completado"}</th>
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
