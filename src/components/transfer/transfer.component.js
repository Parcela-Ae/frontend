import { Controller, useForm } from 'react-hook-form'
import InputMask from "react-input-mask";
import styles from '../../../styles/transfer.module.css'
export default function Transfer() {
    const { register, handleSubmit, control, errors, watch, trigger } = useForm()
    return (
        <div className={styles.container}>
            <h1>Transferencia de credito</h1>
            <form action="post" className={styles.form}>
                <div>
                    <div className={styles.inputDiv}>
                        <div className={styles.input}>
                            <Controller
                                inputRef={register({})}
                                placeholder="Conta do Recebedor *"
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