import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserProvider from '../context/providers/UserProvider'
import NavHeader from '../components/layout/NavHeader'
import Footer from '../components/layout/Footer'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {


  return (
    <>
      <UserProvider>
        <Head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
        </Head>
        <NavHeader />
        <Component {...pageProps} />
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossOrigin="anonymous"></script>
        <Footer />
      </UserProvider>
    </>
  )
}

export default MyApp
