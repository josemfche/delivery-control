import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserProvider from '../context/providers/UserProvider'

function MyApp({ Component, pageProps }) {
  return <>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  </>
}

export default MyApp
