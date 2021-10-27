import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/historic.module.css'
import { AuthContext } from '../../contexts/AuthContexts'
import PaymentService from '../../services/payment.service'

export default function Appointment() {
  const { user } = useContext(AuthContext)
  const [transaction, setTransaction] = useState([])

  useEffect(async () => {
    setTransaction(await PaymentService.findAllTransaction(user?.id))

  }, [])
  return (
    <div className={styles.historic}>
      <div className={styles.content}>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Clinica</th>
              <th>Data</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((item) => (
              <tr key={item.id}>
                <th>{ item.id}</th>
                <th>{item?.clinica}</th>
                <td>{item.operationDate}</td>
                <td>{item.type}</td>
                <td>R$ {item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}