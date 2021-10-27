import { parseCookies } from 'nookies'
import Appointment from '../../components/appointment/appointment.component'
import { Footer } from '../../components/footer/footer.component'


export  default function appointment() {
    return (
        <>
        <div>
          <Appointment/>
        </div>
        <Footer />
        </>
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