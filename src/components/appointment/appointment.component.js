import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/historic.module.css'
import { AuthContext } from '../../contexts/AuthContexts'
import SchedulesService from '../../services/schedules.service'

export default function Appointment() {
  const { user } = useContext(AuthContext)
  const [appointment, setAppointment] = useState([])
  let [isClinic, setIsClinic] = useState(false)

  useEffect(async () => {
    if (user) {
      if (user?.typeUser == "CLINICA") {
        setAppointment(await SchedulesService.findbyClinic(user?.id))
        setIsClinic(true);
      }
      else {
        setAppointment(await SchedulesService.findbyClient(user?.id))
        setIsClinic(false);
      }
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
                    {isClinic ? (
                      <th>Cliente</th>
                    ) : (
                      <th>Clínica</th>
                    )}
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment?.map((item, index) => (
                    <tr key={index}>

                      {isClinic ? (
                        <th>{item?.customer?.name}</th>
                      ) : (
                        <th>{item?.clinic?.name}</th>
                      )}

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