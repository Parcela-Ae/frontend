import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/balance.module.css'
import { AuthContext } from '../../contexts/AuthContexts'
import PaymentService from '../../services/payment.service'

export function Balance() {
    const { user } = useContext(AuthContext)
    const [client, setClient] = useState()

    useEffect(async () => {
        if (user?.typeUser == "CLIENTE")
            setClient(await PaymentService.getBalance(user.id))
        else
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
                        <h6>{client?.lastTransaction?.value} Créditos - {client?.lastTransaction?.operationDate}</h6>
                        <h6>{client?.lastTransaction?.type}</h6>
                        <span>numero da conta: {client?.credit?.id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}