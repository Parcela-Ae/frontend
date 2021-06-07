import styles from '../../../styles/login.module.css'
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify'
import User from '../../models/user.model'

import AuthService from '../../services/auth.service'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'


export default function Login() {
    const { register, handleSubmit, control, errors, watch } = useForm()
    let [invalidUser, setInvalidUser] = useState(false)
    let user = new User()

    const loadAuth = (us) => {
        AuthService.signin(us).then(async (datas) => {
            if (datas.token) {
                SessionService.login(datas)
                setInvalidUser(false)
                return
            }

            setInvalidUser(true)
        }, (error) => {
            console.error(error)
        }
        )

    }

    async function onSubmit(data) {
        user.email = data.email
        user.password = data.password
        loadAuth(user)
    }

    useEffect(() => {
		
	}, [])
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
                        {invalidUser == true && <div className="error">Login e/ou Senha inválido</div>}
                    </div>
                </form>
            </div>
        </main >

    )
}