import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserProvider from '../context/providers/UserProvider'
import NavHeader from '../components/layout/NavHeader'

function MyApp({ Component, pageProps }) {
  return <>
    <UserProvider>
      <NavHeader />
      <Component {...pageProps} />
    </UserProvider>
  </>
}

export default MyApp
