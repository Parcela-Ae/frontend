import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import InputMask from "react-input-mask";
import { toast } from 'react-nextjs-toast'
import styles from '../../../styles/transfer.module.css'
import { AuthContext } from '../../contexts/AuthContexts';
import PaymentService from '../../services/payment.service';
export default function Transfer() {

	const { register, handleSubmit, control, errors, watch, trigger } = useForm()
	const { user } = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(false)

	async function onSubmit(data) {
		setIsLoading(true)
		const paymant = {
			"accountNumberOrigin": user?.accountNumber,
			"cpfCnpj": data.cpf,
			"value": data.value,
			"type": "TRANSFER",
		}

		await PaymentService.create(paymant)
			.then(async (e) => {

				if (!e) {

					toast.notify('Transferencia efetuado com sucesso!!', {
						duration: 5,
						type: "success",
						title: "sucesso"
					})
					setIsLoading(false)

					window.location.href = '/home'
				} else {
					toast.notify(e.message ? e.message : "CPF invalido!", {
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
			<h1>Transferencia de credito</h1>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
				<div>
					<div className={styles.inputDiv}>
						<div className={styles.input}>
						<Controller
              inputRef={register({})}
              as={InputMask}
              control={control}
							placeholder="Digite o CPF*"
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
							{errors.cpf && <span className="error">{errors.cpf.message}</span>}
						</div>
						<div className={styles.input}>
							<Controller
								inputRef={register({})}
								placeholder="Valor da recarga*"
								as={InputMask}
								control={control}
								maskChar=""
								defaultValue=""
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
					</div>
					<div className={styles.input}>
					<button
								disabled={isLoading ? true : false}
								type="submit"
							>
								{isLoading ? 'Carregando...' : 'Realizar Transferencia'}
							</button>
					</div>
				</div>
			</form>
		</div>

	)
}