import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/clinic.module.css'
import Modal from "react-modal";
import { toast } from 'react-nextjs-toast';
import PaymentService from '../../services/payment.service';
import { AuthContext } from '../../contexts/AuthContexts';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import SchedulesService from '../../services/schedules.service';

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ClinicItem({ clinic, specialty }) {
  const { register, handleSubmit, control, errors, watch } = useForm()
  const { user } = useContext(AuthContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [hour, setHour] = useState()
  const [date, setDate] = useState()
  const [clinicSpecialty, setClinicSpecialty] =  useState()

  let now = moment()
  now = moment(now).format('YYYY-MM-DD')
  let hours = []
  for (let i = 8; i <= 19; i++) {
    i = (i <= 9 ? "0" + i : i)
    hours.push(i)
  }

  function btnClick(hour) {
    let appointment = moment(date, 'YYYY-MM-DD', true)
    let teste = appointment.diff(now)
    const filtro = clinic?.specialties?.filter((item) => (item?.name?.includes(specialty)))
    setClinicSpecialty(filtro[0])
    
    // teste
    let teste1= moment(date+" "+hour).format('DD/MM/YYYY HH:mm')
    console.log(teste1)
    
    if (!date) {
      toast.notify("A data não pode ser vazia", {
        duration: 5,
        type: "error",
        title: "error !!"
      })
    } else if (teste <= 0) {
      toast.notify("A data não pode ser menor ou igual a hoje", {
        duration: 5,
        type: "error",
        title: "error !!"
      })
    } else {
      setHour(hour)
      setModalIsOpen(true)
    }
  }

  function loadDate(v) {
    setDate(v)
  }

  async function appointment() {
    

    const paymant = {
      "accountNumberOrigin": user?.accountNumber,
      "cpfCnpj": clinic?.cnpj,
      "type": "PAYMENT",
      "customerId": user?.id,
      "clinicId": clinic.id,
      "value": clinicSpecialty.appointmentValue,
      "specialtyId": clinicSpecialty.id,
      "scheduledTo": "2021-12-31T23:59:59"
    }
    SchedulesService.create(paymant)
      .then(async (e) => {

        if (!e) {
          setModalIsOpen(false)
          toast.notify('Marcação realizada com sucesso!!', {
            duration: 5,
            type: "success",
            title: "sucesso"
          })
        } else {
          setModalIsOpen(false)
          toast.notify(e.message ? e.message : "Ocorreu um erro, Já estamos cientes do ocorrido", {
            duration: 5,
            type: "error",
            title: "error"
          })
        }

      }).catch((error) => {
        setModalIsOpen(false)
        toast.notify(error.message, {
          duration: 5,
          type: "error",
          title: "error"
        })
      })
  }

  return (
    <div className={styles.clinicItem}>
      <div className={styles.clinic}>
        <div className={styles.div}>
          <div className="centralizar">
            <div className={styles.clinicHeader}>
              <img src="./img/image_clinic.svg" alt="" />
              <div >
                <span>
                  <strong>{clinic.name}</strong>
                </span>
                <div>
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                </div>
              </div>
            </div>

            <div>
              <span>endereço:</span>
              <p>
                {clinic?.addresses[0].publicArea}, Nº{clinic?.addresses[0].number}, {clinic?.addresses[0].complement}
              </p>
              <p>
                {clinic?.addresses[0].city}, {clinic?.addresses[0].state}
              </p>

            </div>
            <p>
              <strong>cnpj:</strong> {clinic?.cnpj}
            </p>
            <p>
              <strong>telefone:</strong> {clinic.phones[0]} / {clinic.phones[1]}
            </p>
            <span>Horário de Funcionamento: 08h às 19h</span>

          </div>
          <div >
            <div className="input">
              <label htmlFor="birthdate">
                Data de agendamento
              </label>
              <input
                type="date"
                aria-invalid={
                  errors.birthdate ? 'true' : 'false'
                }
                min={now}
                id="date"
                name="date"
                ref={register({
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 8
                  },
                })}
                onChange={(e) => { loadDate(e.target.value) }}
              />
              {errors.birthdate && (
                <span className="error">
                  {errors.birthdate.message}
                </span>
              )}
            </div>
            <span>Horário disponível</span>
            <div className="btngrid">
              {hours.map((item) => (
                <div key={item} className="input" >
                  <button value={`${item}:00`} onClick={(e) => { btnClick(e.target.value) }}>
                    {item}:00
                  </button>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <h1>Gostaria de Marcar nesse horario?</h1>
        <div>
          <p>
            <strong>Preço:</strong> {clinicSpecialty?.appointmentValue} creditos
          </p>
          <p>
            <strong>Data:</strong> {moment(date).format('DD/MM/YYYY')}  <strong>Horario:</strong> {hour}
          </p>
        </div>
        <div className="btngrid2">
          <div className="input">
            <button onClick={appointment}>
              Sim
            </button>
          </div>
          <div className="input">
            <button onClick={() => { setModalIsOpen(false) }}>
              Não
            </button>
          </div>
        </div>
      </Modal>
    </div>

  )
}