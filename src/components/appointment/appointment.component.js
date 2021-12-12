import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/historic.module.css'
import { AuthContext } from '../../contexts/AuthContexts'
import SchedulesService from '../../services/schedules.service'

export default function Appointment() {
  const { user } = useContext(AuthContext)
  const [appointment, setAppointment] = useState([])

  useEffect(async () => {
    if (user) {
      if (user?.typeUser == "CLINICA")
        setAppointment(await SchedulesService.findbyClinic(user?.id))
      else
        setAppointment(await SchedulesService.findbyClient(user?.id))
    }

  }, [user])
  return (
    <div className="bg">
      <main className="main">
        <div className="container-box">
          <div className={styles.historic}>
            <div className={styles.content}>
              <table>
                <thead>
                  <tr>
                    <th>Clinica</th>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment?.map((item, index) => (
                    <tr key={index}>
                      <th>{item?.clinic?.name}</th>
                      <td>{item?.scheduledTo} {item?.appointmentTime}</td>
                      <td>{item?.specialty?.name}</td>
                      <td>{item?.appointmentValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main >
    </div>
  )
}