import { parseCookies } from 'nookies'
import styles from '../../../styles/clinic.module.css'
import ClinicItem from '../../components/clinic/clinicItem.component'
import { Footer } from '../../components/footer/footer.component'

export default function clinic() {
  return (

    <div className={styles.container}>
      <h2>Psiquiatra, Recife</h2>
      <div className={styles.content}>
        <ClinicItem />
        <ClinicItem />
        <ClinicItem />
        <ClinicItem />
        <ClinicItem />
        <ClinicItem />
        <ClinicItem />
        <ClinicItem />
        <ClinicItem />
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