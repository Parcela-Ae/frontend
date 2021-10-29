import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form'
import InputMask from "react-input-mask";
import { toast } from 'react-nextjs-toast'
import styles from '../../../styles/transfer.module.css'
import { AuthContext } from '../../contexts/AuthContexts';
import PaymentService from '../../services/payment.service';
export default function Transfer() {

	const { register, handleSubmit, control, errors, watch, trigger } = useForm()
	const { user } = useContext(AuthContext)

	async function onSubmit(data) {
		const paymant = {
			"originCreditId": user?.accountNumber,
			"cpfCnpj": data.cpfCnpj,
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

					window.location.href = '/home'
				} else {
					toast.notify(e.message ? e.message : "Conta inválida", {
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
	return (
		<div className={styles.container}>
			<h1>Transferencia de credito</h1>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
				<div>
					<div className={styles.inputDiv}>
						<div className={styles.input}>
							<Controller
								inputRef={register({})}
								placeholder="CPF/CNPJ do Recebedor *"
								as={InputMask}
								control={control}
								maskChar="99999999999999999"
								defaultValue=""
								aria-invalid={errors.value ? "true" : "false"}
								id="cpfCnpj"
								name="cpfCnpj"
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
						<button >Realizar Transferencia</button>
					</div>
				</div>
			</form>
		</div>

	)
}