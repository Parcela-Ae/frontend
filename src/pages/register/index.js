import { useState } from 'react'
import styles from '../../../styles/register.module.css'
import { Footer } from '../../components/footer/footer.component'
import RegisterClient from '../../components/register/registerClient.component'
import RegisterClinic from '../../components/register/registerClinic.component'



export default function register() {
  const [typeUser, SetTypeUser] = useState(1)
  return (
    <div className={styles.bg}>
      <main className={styles.register}>
        <div className={styles.container}>

          <h1>Cadastro</h1>
          <div className={styles.inputButton}>
            <div className={`${styles.input} ${styles.clinicOrClient} ${typeUser === 1 ? 'select' : '' }`}>
              <button onClick={()=>{SetTypeUser(1)}}>Cliente</button>
            </div>
            <div className={`${styles.input} ${styles.clinicOrClient} ${ typeUser === 2 ? 'select' : '' }`}>
              <button onClick={()=>{SetTypeUser(2)}}>Clinica</button>
            </div>
          </div>
          {typeUser === 1 && (
            <RegisterClient />
          )}
          {typeUser === 2 && (
            <RegisterClinic />
          )}
        </div >
      </main >
      <Footer />
    </div>

  )
}