import styles from '../../../styles/balance.module.css'

import { Footer } from "../../components/footer/footer.component"
import { Header } from "../../components/header/header.component"

import Historic from "../../components/historic/historic.component"
import Recharge from "../../components/recharge/recharge.component"
import Transfer from "../../components/transfer/transfer.component"
import { Balance } from "../../components/balance/balance.component"
import { parseCookies } from 'nookies'
import { useState } from "react"


export default function balance() {
  const [select,Setselect] = useState(1)

  return (
    <div className={styles.bg}>
      <main className={styles.saldo}>
        <div className={styles.container}>

          <div className={styles.side}>
            <div className={styles.sideLink}>
              <a className={select === 1 ? `sideSelect` : ""} onClick={()=>{Setselect(1)}} id={styles.redondo}>Recarga</a>
              <a className={select === 2 ? `sideSelect` : ""} onClick={()=>{Setselect(2)}}>Saldo</a>
              <a className={select === 3 ? `sideSelect` : ""} onClick={()=>{Setselect(3)}} >Histórico</a>
              <a className={select === 4 ? `sideSelect` : ""} onClick={()=>{Setselect(4)}} >Transferencia</a>
            </div>
          </div>
          {(select === 1 && <Recharge />) || (select === 2 && <Balance />) || (select === 3 && <Historic />) || (select === 4 && <Transfer />)}

        </div>
      </main>
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