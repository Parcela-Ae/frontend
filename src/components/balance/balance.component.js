import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/balance.module.css'
import { AuthContext } from '../../contexts/AuthContexts'
import PaymentService from '../../services/payment.service'

export function Balance() {
    const { user} = useContext(AuthContext)
    const [ client,setClient] = useState()

    useEffect(async () => {
        setClient(await PaymentService.getBalance(user.id))
      }, [])
   
    return (
        <div className={styles.content}>
            <div className="container" >
                <div className={styles.card}>
                        <div>
                            <h5> <strong>Saldo</strong></h5>
                            <h1> <strong>{client?.credit?.balance ? client?.credit?.balance : "00"}</strong></h1>
                            <p>créditos</p>
                        </div>
                        <div >
                            <h5><strong>última recarga</strong></h5>
                            <h6>3500 Créditos - 25/06</h6>
                            <span>numero da conta: {user.id}</span>
                        </div>
                </div>
            </div>
        </div>
    )
}