import { parseCookies } from 'nookies'
import { Controller, useForm } from 'react-hook-form'
import styles from '../../../styles/transfer.module.css'
import InputMask from "react-input-mask";
import { Footer } from '../../components/footer/footer.component'
import ClinicService from '../../services/clinic.service'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import Autocomplete from 'react-autocomplete';
import { toast } from 'react-nextjs-toast'

export default function specialties({ specialties }) {
  const { register, handleSubmit, control, errors, watch, trigger } = useForm()
  const { user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState()
  const [clinicSpecialties, setClinicSpecialties] = useState([])
  const [seachSpecialties, setseachSpecialties] = useState([])


  useEffect( async() => {
    if (user?.id) {

      await ClinicService.findForClinicSpecialties(user?.id)
        .then((result) => {
          for (let index = 0; index < result.length; index++) {
            let filtro = specialties.filter((item, idx) => item.id != result[index].id)
            specialties = filtro
          }
          setseachSpecialties(specialties)
          setClinicSpecialties(result)
        })
        .catch((e) => console.log(e))

    }

  }, [user])

  const addClinic = (val) => {
    const filtro = seachSpecialties.filter((item) => (item?.name?.includes(val)))
    const remove = seachSpecialties.filter((item, idx) => item?.name != val)
    setClinicSpecialties([...clinicSpecialties, filtro[0]])
    setseachSpecialties(remove)
  }

  const removeClinic = (index) => {
    const item = clinicSpecialties.filter((item, idx) => idx == index)
    const filtro = clinicSpecialties.filter((item, idx) => idx != index)
    setClinicSpecialties(filtro)
    setseachSpecialties([item[0], ...seachSpecialties])
  }

  const setAppointmentValue = (valor, index) => {
    clinicSpecialties[index].appointmentValue = parseInt(valor.currentTarget.value)
  }

  const onSubmit = () => {
    ClinicService.changeForClinicSpecialties(user.id, clinicSpecialties)
      .then((e) => {
        if (!e) {

          toast.notify('atualização realizada', {
            duration: 5,
            type: "success",
            title: "sucesso"
          })

          window.location.href = '/specialties'

        } else if (e.errors[0].message) {
          toast.notify(e.errors[0].message ? e.errors[0].message : "Ocorreu um erro, Já estamos cientes do ocorrido", {
            duration: 5,
            type: "error",
            title: "error"
          })
          setIsLoading(false)
        } else {
          toast.notify(e.message ? e.message : "Ocorreu um erro, Já estamos cientes do ocorrido", {
            duration: 5,
            type: "error",
            title: "error"
          })
          setIsLoading(false)
        }
      }).catch((error) => {
        toast.notify(error.message, {
          duration: 5,
          type: "error",
          title: "error"
        })
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="bg">
        <main className="main">
          <div className="container-box">
            <h1>Especialidades</h1>
            <div className="inputSearch">
              <span>barra de pesquisa</span>
              <div className={styles.input}>
                <Autocomplete
                  getItemValue={(item) => item.name}
                  items={seachSpecialties}
                  className="teste"
                  renderItem={(item, isHighlighted) =>
                    <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item.name}
                    </div>
                  }
                  value={value}
                  onSelect={(val) => addClinic(val)}
                />
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
              <div>
                {clinicSpecialties.map((item, index) => (
                  <div className="inputDiv" key={item.id}>
                    <div className={styles.input}>
                      <input type="text"
                        id="speciality"
                        name="speciality"
                        value={item?.name}
                        placeholder="Especialidade"
                        aria-invalid={errors.speciality ? "true" : "false"}
                        readOnly
                      />
                    </div>
                    <div className={styles.input}>
                      <Controller
                        placeholder="Valor *"
                        as={InputMask}
                        control={control}
                        defaultValue={item.appointmentValue}
                        onKeyUp={(e) => setAppointmentValue(e, index)}
                        id={`value${item.id}`}
                        name={`value${item.id}`}
                      />
                      {errors.value && <span className="error">{errors.value.message}</span>}
                    </div>
                    <div className={styles.input}>
                      <a href="#" onClick={() => removeClinic(index)} className="display-block">remover</a>
                    </div>
                  </div>
                ))}

                <div className={styles.inputDiv}>

                  <div className={styles.input}>
                    <button
                      disabled={isLoading ? true : false}
                      type="submit"
                    >
                      {isLoading ? 'Carregando...' : 'Salvar'}
                    </button>
                  </div>
                </div>
              </div>
            </form>


          </div>
        </main >
      </div >
      <Footer />

    </>
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
  let specialties = await ClinicService.findAllSpecialties()
  return {
    props: { specialties }
  }
}