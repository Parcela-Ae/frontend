import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import styles from '../../../styles/clinic.module.css'
import ClinicItem from '../../components/clinic/clinicItem.component'
import { Footer } from '../../components/footer/footer.component'
import { useRouter } from "next/router"
import ClinicService from '../../services/clinic.service'
import { toast } from 'react-nextjs-toast'
import Search from '../../components/search/search.component'

export default function clinic({specialties, cities}) {
  const router = useRouter()
  const [clinic, setClinic] = useState([])
  const {
    query: { specialty, city }
  } = router

  useEffect(async () => {
    if (!specialty || (!specialty && !city)) {
      toast.notify('Especialidade não pode ser vazia !!', {
        duration: 5,
        type: "error",
        title: "error!"
      })
      setTimeout(() => {
        window.location.href = '/home'
      },5000)  
    } else {
      const param = {
        name: "",
        specialty: specialty,
        city: city
      }
      setClinic(await ClinicService.findClinicSearch(param))

    }
  }, [])

  useEffect(async () => {
    if (!specialty || (!specialty && !city)) {
      toast.notify('Especialidade não pode ser vazia !!', {
        duration: 5,
        type: "error",
        title: "error!"
      })
      setTimeout(() => {
        window.location.href = '/home'
      },5000)  
    } else {
      const param = {
        name: "",
        specialty: specialty,
        city: city
      }
      setClinic(await ClinicService.findClinicSearch(param))
    }
   }, [city,specialty])
  return (

    <div className={styles.container}>
       <Search specialties={specialties} cities={cities} />
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
  let cities = await ClinicService.findAllCities()
  let specialties = await ClinicService.findAllSpecialties()
  return {
    props: {specialties, cities}
  }
}