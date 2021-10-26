import Link from 'next/link'
import Router from "next/router"
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../../../styles/Home.module.css'
import { Footer } from '../../components/footer/footer.component'
import ClinicService from '../../services/clinic.service'

export default function home() {

  const { register, handleSubmit, control, errors, watch, trigger } = useForm()
  const [specialties, setSpecialties] = useState([])
  const [cities, setCities] = useState([])
  const [specialty, setSpecialty] = useState()
  const [city, setCity] = useState()

  useEffect(async () => {
    setSpecialties(await ClinicService.findAllSpecialties())
    setCities(await ClinicService.findAllCities())
  }, [])

  async function onSubmit(data) {
    const query = {
      specialty: data.specialties,
      city: data.cities
    }
    Router.push("/clinic", query)

  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <main id={styles.home_logado}>
          <div className="container">
            <div>
              <div className={styles.descricao_pesquisa}>
                <h4>Agende agora a sua consulta</h4>
                <h5>É rápido, prático e sem pesar no seu bolso</h5>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.search}>
                <div className={styles.searchItems}>
                  <label htmlFor="especialidade">Especialidade</label>
                  {errors.specialties && <span className="error">{errors.specialties.message}</span>}
                  <select
                    id="specialties"
                    name="specialties"
                    ref={register({})}
                    onChange={e => setSpecialty(e.target.value)}
                  >
                    <option value="">Buscar...</option>
                    {specialties.map((item) => (
                      <option key={item.id} value={item.name}> {item.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.searchItems}>
                  <label htmlFor="cities">Local</label>
                  {errors.cities && <span className="error">{errors.cities.message}</span>}
                  <select
                    id="cities"
                    name="cities"
                    ref={register({})}
                    onChange={e => setCity(e.target.value)}
                  >
                    <option value="">Buscar...</option>
                    {cities.map((item) => (
                      <option key={item.name} value={item.name}> {item.name}</option>
                    ))}
                  </select>
                </div>
                <Link href={{
                pathname: "/clinic",
                query: { 
                  specialty: specialty,
                  city: city
                },
              }}>
                <div className={styles.searchItems}>
                  <button type="submit" id={styles.img_search}>
                    <img src="./img/search.svg" id={styles.img_search} />
                  </button>
                </div>
                </Link>
              </div>
            </form>
            {/* <div className={styles.keywords}>
                            Ginecologista • Dermatologista • Psiquiatra • Psicólogo • Ortopedista - traumatologista
                            Endocrinologista • Oftalmologista • Cardiologista • Dentista • Urologista • Neurologista
                        </div> */}
          </div>
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
  return {
    props: {}
  }
}