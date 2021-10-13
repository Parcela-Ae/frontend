import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/historic.module.css'
import { AuthContext } from '../../contexts/AuthContexts'
import PaymentService from '../../services/payment.service'

export default function Historic() {
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
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((item) => (
              <tr key={item.id}>
                <th>{ item.id}</th>
                <td>{item.operationDate}</td>
                <td>{item.type}</td>
                <td>R$ {item.value}</td>
                <td><a href=" ">detalhes</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}