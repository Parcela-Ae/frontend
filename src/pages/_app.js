import '../../styles/globals.css'
import { Header } from '../components/header/header.component'
import { AuthProvider } from '../contexts/AuthContexts'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
