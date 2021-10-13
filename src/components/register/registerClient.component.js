import styles from '../../../styles/register.module.css'
import { useForm, Controller } from 'react-hook-form'
import InputMask from "react-input-mask"
import { useContext, useState } from 'react'
import AddressService from '../../services/address.service'
import ClientService from '../../services/client.service'
import { AuthContext } from '../../contexts/AuthContexts'
import { toast } from 'react-nextjs-toast'

export default function RegisterClient() {

  const { register, handleSubmit, control, errors, watch, trigger } = useForm()
  const { signIn } = useContext(AuthContext)
  const [validNumber, setValidNumber] = useState(false)
  const [step, setStep] = useState(1)

  let [uf, setUf] = useState("")
  let [city, setCity] = useState("")
  let [street, setStreet] = useState("")
  let [cep, setCep] = useState("")
  let [complement, setComplement] = useState("")
  let [number, setNumber] = useState("")

  async function onSubmit(data) {


    data.cpf = data.cpf.replace(/[\W_]/g, '')
    data.cep = data.cep.replace(/[\W_]/g, '')
    data.phone1 = data.phone1.replace(/[\W_]/g, '')
    data.phone2 = data.phone2.replace(/[\W_]/g, '')

    let client = {
      name: data.name,
      email: data.email,
      password: data.password,
      cpfOuCnpj: data.cpf,
      phone1: data.phone1,
      phone2: data.phone2,
      publicArea: data.publicArea,
      number: data.number,
      complement: data.complement,
      zipCode: data.cep,
      city: data.city,
      state: data.state,
    }
    
    await ClientService.create(client)
      .then(async (e) => {

        if (!e) {

          toast.notify('Cadastro efetuado com sucesso!!', {
            duration: 5,
            type: "success",
            title: "sucesso"
          })

          let login = {
            email: client.email,
            password: client.password
          }
          await signIn(login)

        } else {
          toast.notify(e.errors[0].message, {
            duration: 5,
            type: "error",
            title: "error"
          })
        }

      }).catch((error) => {

        toast.notify(error.message, {
          duration: 5,
          type: "error",
          title: "error"
        })
      })
  }

  const checkPhone = (value) => {
    let onlyNumbers = value.replace(/\D/g, '')

    return (
      (onlyNumbers.startsWith('9', 2) && onlyNumbers.length > 10) ||
      onlyNumbers.length === 0 ||
      'Digite um celular válido'
    )
  }

  let fetchAddressByCEP = async (e) => {
    if (e.target.value.length === 9) {
      await AddressService.searchByCEP(e.target.value).then((cep) => {
        if (cep.uf == null && cep.localidade == null && cep.logradouro == null) {
          setUf("")
          setCity("")
          setStreet("")
          return null
        }
        setUf(cep.uf)
        setCity(cep.localidade)
        setStreet(cep.logradouro)
      })
    }
  }
  const step1 = [
    'name',
    'email',
    'password',
    'password_confirmation',
    'cpf'
  ]

  const nextStep = async () => {
    if (step === 1)
      await trigger(step1).then(() => {
        if (
          !(
            errors.name ||
            errors.email ||
            errors.password ||
            errors.password_confirmation ||
            errors.cpf
          )
        )
          setStep(step + 1)
      })
  }

  const prevStep = () => {
    setStep(step - 1)
  }


  return (

    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputDiv}>

        <div style={{ display: step === 1 ? 'block' : 'none' }}>
          <div className={styles.input}>
            <label htmlFor="name">Nome *</label>
            {errors.name && <span className="error">{errors.name.message}</span>}
            <input type="text"
              id="name"
              name="name"
              aria-invalid={errors.name ? "true" : "false"}
              defaultValue=""
              ref={register({
                required: "Obrigatório",
                minLength: {
                  value: 2,
                  message: "Nome deve ter no mínimo 2 caracteres"
                },
                pattern: {
                  value: /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄçÇ\s]+$/i,
                  message: "Digite um nome válido"
                },
              })} />
          </div>

          <div className={styles.input}>
            <label htmlFor="email">Email *</label>
            {errors.email && <span className="error">{errors.email.message}</span>}
            <input type="email"
              id="email"
              name="email"
              defaultValue=""
              aria-invalid={errors.email ? "true" : "false"}
              ref={register({
                required: "Obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Digite um e-mail válido",
                }
              })} />
          </div>
          <div className={styles.input}>
            <label htmlFor="cpf">CPF *</label>
            {errors.cpf && <span className="error">{errors.cpf.message}</span>}
            <Controller
              inputRef={register({})}
              as={InputMask}
              control={control}
              mask="999.999.999-99"
              aria-invalid={errors.cpf ? "true" : "false"}
              defaultValue=""
              type="text"
              id="cpf"
              name="cpf"
              maskChar=""
              rules={{
                required: "Obrigatório",
                pattern: {

                  value: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
                  message: "Digite um CPF válido",
                },
              }}
            />
          </div>

          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <label htmlFor="senha">Senha *</label>
              <input type="password"
                id="password"
                name="password"
                aria-invalid={errors.password ? "true" : "false"}
                ref={register({
                  required: "Obrigatório",
                  minLength: {
                    value: 3,
                    message: "Utilize no mínimo 3 caracteres"
                  }
                })} />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <div className={styles.input}>
              <label htmlFor="password_confirmation">Confirmar senha *</label>
              <input
                type="password"
                aria-invalid={errors.password_confirmation ? "true" : "false"}
                id="password_confirmation"
                name="password_confirmation"
                ref={register({
                  required: "Obrigatório",
                  validate: (value) => value === watch('password') || "As senhas não são iguais",
                })}
              />
              {errors.password_confirmation && <span className="error">{errors.password_confirmation.message}</span>}
            </div>
          </div>

          <div className={styles.input}>
            <a onClick={nextStep} >Prosseguir</a>
          </div>

        </div>

        <div style={{ display: step === 2 ? 'block' : 'none' }}>

          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <label htmlFor="phone1">Celular *</label>
              {errors.phone1 && <span className="error">{errors.phone1.message}</span>}
              <Controller as={InputMask} control={control} defaultValue=""
                inputRef={register({})}
                mask="(99) 9 9999-9999" id="phone1" name="phone1" aria-invalid={errors.phone1 ? "true" : "false"}
                maskChar=""
                rules={{
                  required: "Obrigatório",
                  pattern: {
                    value: /^(\([0-9]{2}\))\s([9]\s{1})?([0-9]{4})-([0-9]{4})$/,
                    message: "Digite um celular válido",
                  }
                }} />
            </div>

            <div className={styles.input}>
              <label htmlFor="phone2">Telefone </label>
              {errors.phone2 && <span className="error">{errors.phone2.message}</span>}
              <Controller
                as={InputMask}
                defaultValue=""
                control={control}
                inputRef={register({})}
                mask="(99) 9999-9999" id="phone2" name="phone2" aria-invalid={errors.phone2 ? "true" : "false"}
                maskChar=""
                rules={{
                  pattern: {
                    value: /^(\([0-9]{2}\))\s([9]\s{1})?([0-9]{4})-([0-9]{4})$/,
                    message: "Digite um celular válido",
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <label htmlFor="cep">CEP *</label>
              {errors.cep && <span className="error">{errors.cep.message}</span>}
              <Controller as={InputMask} control={control} onKeyUp={fetchAddressByCEP} defaultValue=""
                inputRef={register({})}
                mask="99999-999" maskChar="" id="cep" name="cep" aria-invalid={errors.cep ? "true" : "false"}
                rules={{
                  required: "Obrigatório",
                  minLength: {
                    value: 8,
                    message: "CEP deve ter no mínimo 8 caracteres"
                  },
                }
                } />

            </div>
            <div className={styles.input}>
              <label htmlFor="state">Estado *</label>
              {errors.state && <span className="error">{errors.state.message}</span>}
              <input type="text" readOnly={true} id="state" name="state" aria-invalid={errors.state ? "true" : "false"} value={uf}
                ref={register({
                  required: "Obrigatório",
                })} />
            </div>
          </div>

          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <label htmlFor="publicArea">Endereço *</label>
              {errors.publicArea && <span className="error">{errors.publicArea.message}</span>}
              <input type="text" readOnly={true} id="publicArea" name="publicArea" aria-invalid={errors.publicArea ? "true" : "false"} value={street}
                ref={register({
                  required: "Obrigatório",
                })} />
            </div>
            <div className={styles.input}>
              <label htmlFor="city">Cidade *</label>
              {errors.city && <span className="error">{errors.city.message}</span>}
              <input type="text" readOnly={true} id="city" name="city" aria-invalid={errors.city ? "true" : "false"} value={city}
                ref={register({
                  required: "Obrigatório",
                  minLength: {
                    value: 2,
                    message: "Nome deve ter no mínimo 2 caracteres"
                  },
                  pattern: {
                    value: /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄçÇ\s]+$/i,
                    message: "Digite um nome válido"
                  },
                })} />

            </div>
          </div>

          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <label htmlFor="number">Número *</label>
              {errors.number && <span className="error">{errors.number.message}</span>}
              <input type="text" id="number" name="number" aria-invalid={errors.number ? "true" : "false"} defaultValue={number}
                onChange={(e) => {
                  let inputTarget = e.target
                  let nb = inputTarget.value
                  if (nb.length == 0) {
                    setValidNumber(false)
                  } else {
                    setValidNumber(true)
                  }
                }}
                ref={register({
                  required: "Obrigatório",
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Digite um número válido"
                  },
                })} />
            </div >
            <div className={styles.input}>
              <label htmlFor="complement">Complemento</label>
              <input type="text" id="complement" name="complement" aria-invalid={errors.complement ? "true" : "false"} defaultValue={complement}
                ref={register({})} />
            </div>
          </div>

          <div className={styles.inputButton}>
            <div className={styles.input}>
              <a onClick={prevStep} >voltar</a>
            </div>
            <div className={styles.input}>
              <button type="submit" >Enviar</button>
            </div>

          </div>
        </div>
      </div>
    </form>

  )
}