import styles from '../../../styles/login.module.css'
import { Controller, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
export default function Login() {
    const { register, handleSubmit, control, errors, watch } = useForm()

    function onSubmit(data) {
        console.log(data)
    }
    return (
        <main className={styles.login}>
            <div className={styles.container}>
                <h1>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className={styles.input}>
                            <input type="email"
                                id="email"
                                placeholder="Login: "
                                name="email"
                                defaultValue=""
                                aria-invalid={errors.email ? "true" : "false"}
                                ref={register({
                                    required: "Campo obrigatório",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Digite um e-mail válido",
                                    }
                                })} />
                            {errors.email && <span className="error">{errors.email.message}</span>}
                        </div>
                        <div className={styles.input}>
                            <input type="password"
                                id="password"
                                name="password"
                                placeholder="Senha: "
                                aria-invalid={errors.password ? "true" : "false"}
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 6,
                                        message: "Utilize no mínimo 6 caracteres"
                                    }
                                })} />
                            {errors.password && <span className="error">{errors.password.message}</span>}
                        </div>
                        <div className={styles.input}>
                            <button >Realizar Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </main >

    );
}