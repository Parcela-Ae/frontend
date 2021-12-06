import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/clinic.module.css'
import Modal from "react-modal";
import { toast } from 'react-nextjs-toast';
import PaymentService from '../../services/payment.service';
import { AuthContext } from '../../contexts/AuthContexts';
import { useForm } from 'react-hook-form';

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

export default function ClinicItem({ clinic }) {
  const { register, handleSubmit, control, errors, watch } = useForm()
  const { user } = useContext(AuthContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [value, setValue] = useState()


  function btnClick(v) {
    setValue(v)
    setModalIsOpen(true)

  }

  function loadDate(v) {
    console.log(v);

  }
  async function appointment() {
    const paymant = {
      "accountNumberOrigin": user?.accountNumber,
      "cpfCnpj": clinic?.cnpj,
      "value": 150,
      "type": "PAYMENT"
    }
    PaymentService.create(paymant)
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
          toast.notify(e.message ? e.message : "Ocorreu um erro, já estamos cientes do ocorrido", {
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
                {clinic?.addresses[0].publicArea}, Nº{clinic?.addresses[0].number}, {clinic?.addresses[0].complement}, {clinic?.addresses[0].neighborhood}, {clinic?.addresses[0].state}
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
									id="birthdate"
									name="birthdate"
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
            <div className="input" >
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  08:00
                </button>
              </div>
              <div className="input" >
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  09:00
                </button>
              </div>
              <div className="input" >
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  10:00
                </button>
              </div>
              <div className="input" >
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  11:00
                </button>
              </div>
              <div className="input" >
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  12:00
                </button>
              </div>
              <div className="input" >
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  13:00
                </button>
              </div>
              <div className="input">
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  14:00
                </button>
              </div>
              <div className="input">
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  15:00
                </button>
              </div>
              <div className="input">
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  16:00
                </button>
              </div>
              <div className="input">
                <button value="17:00" onClick={(e) => { btnClick(e.target.value) }}>
                  17:00
                </button>
              </div>
              <div className="input">
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  18:00
                </button>
              </div>
              <div className="input" >
                <button onClick={(e) => { btnClick(e.target.value) }}>
                  19:00
                </button>
              </div>

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
            Preço: 150 creditos
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