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
  const [empty, setEmpty] = useState()
  const [emptySpecialty, setemptySpecialty] = useState()
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
      setemptySpecialty(true)
      setEmpty(false)
    } else {
      const param = {
        name: "",
        specialty: specialty,
        city: city
      }
      await ClinicService.findClinicSearch(param).then((clinic) => {
        if (clinic.length != 0){
          setClinic(clinic)
          setEmpty(false)
          setemptySpecialty(false)
        }  
        else {
          setEmpty(true)
          setemptySpecialty(false)
        }
      })
    }
  }, [])

  useEffect(async () => {
    if (!specialty || (!specialty && !city)) {
      toast.notify('Especialidade não pode ser vazia !!', {
        duration: 5,
        type: "error",
        title: "error!"
      })
      setemptySpecialty(true)
      setEmpty(false)
    } else {
      const param = {
        name: "",
        specialty: specialty,
        city: city
      }
      await ClinicService.findClinicSearch(param).then((clinic) => {
        if (clinic.length != 0){
          setClinic(clinic)
          setEmpty(false)
          setemptySpecialty(false)
        }  
        else {
          setEmpty(true)
          setemptySpecialty(false)
        }
      })
    }
  }, [city, specialty])
  return (

    <div className={styles.container}>
      <Search specialties={specialties} cities={cities} />
      <h2>{specialty}, {city}</h2>
      <div className={styles.content}>

        {(!emptySpecialty && !empty) && clinic.map((item) => (
          <ClinicItem key={item.id} clinic={item} specialty={specialty} />
        ))}
        {empty && (
          <div className={styles.clinic}>
            <h1>Nenhuma clinica encontrada</h1>
          </div>
        )}
        {emptySpecialty && (
          <div className={styles.clinic}>
            <h1>Especialidade não pode ser vazia !!</h1>
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
    props: { specialties, cities }
  }
}