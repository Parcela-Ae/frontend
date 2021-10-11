import '../../styles/globals.css'
import { Header } from '../components/header/header.component'
import { AuthProvider } from '../contexts/AuthContexts'
import { ToastContainer } from 'react-nextjs-toast'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ToastContainer />
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  </>
  )
}

export default MyApp
