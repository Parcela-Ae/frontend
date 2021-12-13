import { parseCookies } from 'nookies'
import { useContext, useEffect } from 'react'
import styles from '../../../styles/Home.module.css'
import { Footer } from '../../components/footer/footer.component'
import Search from '../../components/search/search.component'
import { AuthContext } from '../../contexts/AuthContexts'
import ClinicService from '../../services/clinic.service'

export default function home({specialties, cities}) {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if(user){
      if(user?.typeUser != "CLIENTE")
        window.location.href = '/appointment'
    }
    
	}, [user])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <main id={styles.home_logado}>
        <Search specialties={specialties} cities={cities} />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { ['parcelaAe.token']: token } = parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  let cities = await ClinicService.findAllCities()
  let specialties = await ClinicService.findAllSpecialties()
  return {
    props: {specialties, cities}
  }
}