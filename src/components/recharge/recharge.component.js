import { Controller, useForm } from 'react-hook-form'
import styles from '../../../styles/recharge.module.css'
import InputMask from "react-input-mask";
import PaymentService from '../../services/payment.service';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { toast } from 'react-nextjs-toast'


export default function Recharge() {

  const { register, handleSubmit, control, errors, watch, trigger } = useForm()
  const { user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data) {
    setIsLoading(true)
    const paymant = {
      "accountNumberDestination": user?.accountNumber,
      "value": data.value,
      "type": "RECHARGE",
      "cardNumber": data.cardNumber,
      "cvv": data.cvv,
      "cardHolderName": data.name,
      "installments": 5,
      "expirationDate": data.expirationDate
    }
    await PaymentService.create(paymant)
      .then(async (e) => {

        if (!e) {

          toast.notify('Recarga efetuado com sucesso!!', {
            duration: 5,
            type: "success",
            title: "sucesso"
          })
          setIsLoading(false)

          window.location.href = '/home'
        } else {
          toast.notify(e.errors[0].message ? e.errors[0].message : "Ocorreu um erro, Já estamos cientes do ocorrido", {
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
    <div className={styles.container}>
      <h1>Dados do cartão</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <Controller
                inputRef={register({})}
                placeholder="Número do cartão *"
                as={InputMask}
                control={control}
                maskChar=""
                defaultValue=""
                mask="9999 9999 9999 9999"
                aria-invalid={errors.cardNumber ? "true" : "false"}
                id="cardNumber"
                name="cardNumber"
                rules={{
                  minLength: {
                    value: 13,
                    message: "Tamanho mínimo de 13 dígitos"
                  },
                  required: "Obrigatório",
                  pattern: {
                    value: /([0-9]{4}[\s]?[0-9]{4}[\s]?[0-9]{4}[\s]?[0-9]{4})/,
                    message: "Digite um número válido",
                  },
                }}
              />
              {errors.cardNumber && <span className="error">{errors.cardNumber.message}</span>}
            </div>

            <div className={styles.input}>

              <input type="text"
                id="name"
                name="name"
                aria-invalid={errors.name ? "true" : "false"}
                defaultValue=""
                placeholder="Nome Do titular"
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
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <Controller
                inputRef={register({})}
                placeholder="Data de expiração *"
                as={InputMask}
                control={control}
                maskChar=""
                defaultValue=""
                mask="99/99"
                aria-invalid={errors.expirationDate ? "true" : "false"}
                id="expirationDate"
                name="expirationDate"
                rules={{
                  minLength: {
                    value: 5,
                    message: "Tamanho mínimo de 4 dígitos"
                  },
                  required: "Obrigatório",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Data inválida",
                  },
                }}
              />
              {errors.expirationDate && <span className="error">{errors.expirationDate.message}</span>}
            </div>

            <div className={styles.input}>
              <Controller
                inputRef={register({})}
                placeholder="CVV *"
                defaultValue=""
                as={InputMask}
                control={control}
                maskChar=""
                mask="9999"
                aria-invalid={errors.cvvCard ? "true" : "false"}
                id="cvv"
                name="cvv"
                rules={{
                  minLength: {
                    value: 3,
                    message: "Tamanho mínimo de 3 dígitos"
                  },
                  required: "Obrigatório",
                  pattern: {
                    value: /([0-9]){3,4}/,
                    message: "Código inválido",
                  },
                }}
              />
              {errors.cvvCard && <span className="error">{errors.cvvCard.message}</span>}
            </div>
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.input}>
              <Controller
                inputRef={register({})}
                placeholder="Valor da recarga*"
                as={InputMask}
                control={control}
                maskChar=""
                defaultValue=""
                maskChar=""
                mask="99999999999999999"
                aria-invalid={errors.value ? "true" : "false"}
                id="value"
                name="value"
                rules={{
                  required: "Obrigatório",
                  pattern: {
                    value: /([0-9])/,
                    message: "Digite um número válido",
                  },
                }}
              />
              {errors.value && <span className="error">{errors.value.message}</span>}

            </div>

            <div className={styles.input}>
              <select>
                <option value="">Selecione a quantidade de parcelas *</option>
                <option value="1">1x de R$&nbsp;475,00 sem juros</option>
              </select>
            </div>
          </div>
          <div className={styles.input}>
          <button
								disabled={isLoading ? true : false}
								type="submit"
							>
								{isLoading ? 'Carregando...' : 'Realizar Recarga'}
							</button>
          </div>
        </div>
      </form>
    </div>

  )
}