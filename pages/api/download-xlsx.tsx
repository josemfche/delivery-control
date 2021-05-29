// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import XLSX from 'xlsx'
import { db } from '../../firebase'

export default module.exports = (req, res) => {

  const { owner = "", limit = 1 } = req.query

  const allDeliveries = () => {
    db.collection("deliveries")
      .limit(limit)
      .where("owner", "==", owner)
      .get()
      .then((querySnapshot) => {
        const dataFormatted = querySnapshot.docs.map(item => {
          return item.data()
        })

        const worksheet = XLSX.utils.json_to_sheet(dataFormatted)
        const woorkbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(woorkbook, worksheet, "Deliveries");

        XLSX.writeFile(woorkbook, "AllDeliveries.xlsx");

      })
      .catch(error => console.log(error))

  }

  allDeliveries()

  res.status(200).send("Funciona")

}