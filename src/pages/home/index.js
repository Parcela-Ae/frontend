import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../../../styles/Home.module.css'
import { Footer } from '../../components/footer/footer.component'
import ClinicService from '../../services/clinic.service'

export default function home() {

  const { register, handleSubmit, control, errors, watch, trigger } = useForm()
  const [specialties, setSpecialties] = useState([])

  useEffect(async () => {
    setSpecialties(await ClinicService.findAllSpecialties())
  }, [])

  async function onSubmit(data) {
    window.location.href = '/clinic'

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
                  >
                    <option value="">Buscar...</option>
                    {specialties.map((item) => (
                      <option key={item.id} value={item.id}> {item.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.searchItems}>
                  <label htmlFor="local">Local</label>
                  <select>
                    <option value="">Buscar...</option>

                  </select>
                </div>
                <div className={styles.searchItems}>
                  <button type="submit" id={styles.img_search}>
                    <img src="./img/search.svg" id={styles.img_search} />
                  </button>
                </div>
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