import Head from 'next/head'
import styles from '../styles/Home.module.css'
import RowInfo from '../components/info/RowInfo'
import PrivateRoute from '../components/PrivateRoute'

export default function Home() {
  return (
    <>
      <PrivateRoute>
        <RowInfo />
      </PrivateRoute>
    </>
  )
}
