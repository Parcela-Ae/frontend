import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import styles from '../../../styles/clinic.module.css'
import ClinicItem from '../../components/clinic/clinicItem.component'
import { Footer } from '../../components/footer/footer.component'
import { useRouter } from "next/router"
import ClinicService from '../../services/clinic.service'

export default function clinic() {
  const router = useRouter()
  const [clinic, setClinic] = useState([])
  const {
    query: { specialty, city }
  } = router

  useEffect(async () => {
    if (!specialty && !city) {
      window.location.href = '/home'
    } else {
      const param = {
        name: "",
        specialty: specialty,
        city: city
      }
      setClinic(await ClinicService.findClinicSearch(param))

    }
  }, [])
  return (

    <div className={styles.container}>
      <h2>{specialty}, {city}</h2>
      <div className={styles.content}>
        {clinic.map((item) => (
          <ClinicItem key={item.id} clinic={item} />
        ))}
        {clinic.length === 0 && (
          <div className={styles.clinic}>
              <h1>Nenhuma clinica encontrada</h1>
          </div>
        )}
      </div>

      <Footer />
    </div >
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

  return {
    props: {}
  }
}