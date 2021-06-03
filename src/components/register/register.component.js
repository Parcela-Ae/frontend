import styles from '../../../styles/register.module.css'
import { useForm, Controller } from 'react-hook-form'
import InputMask from "react-input-mask"
import { useState } from 'react'
export default function Register() {
    const { register, handleSubmit, control, errors, watch } = useForm()

    let [uf, setUf] = useState()
    let [city, setCity] = useState()
    let [district, setDistrict] = useState()
    let [street, setStreet] = useState()
    let [cep, setCep] = useState();
    let [complement, setComplement] = useState()
    let [number, setNumber] = useState()

    function onSubmit(data) {
        console.log(data)
    }


    let fetchAddressByCEP = async (e) => {
        // await AddressSerivce.searchByCEP(e.target.value).then((cep) => {
        //     if (cep.state == null && cep.city == null && cep.street == null) {
        //         setUf("")
        //         setCity("")
        //         setDistrict("")
        //         setStreet("")
        //         return null
        //     }
        //     setUf(cep.state)
        //     setCity(cep.city)
        //     setDistrict(cep.district)
        //     setStreet(cep.street)
        // })
    }
    return (
        <main className={styles.login}>
            <div className={styles.container}>
                <h1>Cadastro</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputDiv}>
                        <div>
                            <div className={styles.input}>
                                <label htmlFor="name">Nome *</label>
                                <input type="text"
                                    id="name"
                                    name="name"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    defaultValue=""
                                    ref={register({
                                        required: "Campo obrigatório",
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
                            <div className={styles.input}>
                                <label htmlFor="email">Email *</label>
                                <input type="email"
                                    id="email"
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
                                <label htmlFor="cpf">CPF *</label>
                                <Controller
                                    inputRef={register({})}
                                    as={InputMask}
                                    control={control}
                                    mask="999.999.999-99"
                                    aria-invalid={errors.cpf ? "true" : "false"}
                                    defaultValue=""
                                    id="cpf"
                                    name="cpf"
                                    maskChar=""
                                    rules={{
                                        required: "Campo obrigatório",
                                        pattern: {
                                            
                                            value: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
                                            message: "Digite um CPF válido",
                                        },
                                    }}
                                />
                                {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                            </div>
                            <div className={styles.inputDiv}>
                                <div className={styles.input}>
                                    <label htmlFor="senha">Senha *</label>
                                    <input type="password"
                                        id="password"
                                        name="password"
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
                                    <label htmlFor="newPassword">Confirmar senha *</label>
                                    <input
                                        type="password"
                                        aria-invalid={errors.newPassword ? "true" : "false"}
                                        id="newPassword"
                                        name="newPassword"
                                        ref={register({
                                            required: "Campo obrigatório",
                                            validate: (value) => value === watch('password') || "As senhas não são iguais",
                                        })}
                                    />
                                    {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
                                </div>
                            </div>
                            <div className={styles.input}>
                                <button type="submit" >Prosseguir</button>
                            </div>
                        </div>
                        <div>
                            <div className={styles.inputDiv}>
                                <div className={styles.input}>
                                    <label htmlFor="cep">CEP *</label>
                                    <Controller as={InputMask} control={control} onKeyUp={fetchAddressByCEP} defaultValue=""
                                        inputRef={register({})}
                                        mask="99999-999" maskChar="" id="cep" name="cep" aria-invalid={errors.cep ? "true" : "false"}
                                        rules={{
                                            required: "Campo obrigatório",
                                            minLength: {
                                                value: 8,
                                                message: "CEP deve ter no mínimo 8 caracteres"
                                            },
                                        }
                                        } />
                                    {errors.cep && <span className="error">{errors.cep.message}</span>}
                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="state">Estado *</label>
                                    <input type="text" readOnly={true} id="state" name="state" aria-invalid={errors.state ? "true" : "false"} value={uf}
                                        ref={register({
                                            required: "Campo obrigatório",
                                        })} />
                                    {errors.state && <span className="error">{errors.state.message}</span>}

                                </div>
                            </div>
                            <div className={styles.inputDiv}>
                                <div className={styles.input}>
                                    <label htmlFor="city">Cidade *</label>
                                    <input type="text" readOnly={true} id="city" name="city" aria-invalid={errors.city ? "true" : "false"} value={city}
                                        ref={register({
                                            required: "Campo obrigatório",
                                            minLength: {
                                                value: 2,
                                                message: "Nome deve ter no mínimo 2 caracteres"
                                            },
                                            pattern: {
                                                value: /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄçÇ\s]+$/i,
                                                message: "Digite um nome válido"
                                            },
                                        })} />
                                    {errors.city && <span className="error">{errors.city.message}</span>}

                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="district">Bairro *</label>
                                    <input type="text" readOnly={true} id="district" name="district" aria-invalid={errors.district ? "true" : "false"} value={district}
                                        ref={register({
                                            required: "Campo obrigatório",
                                            minLength: {
                                                value: 2,
                                                message: "Nome deve ter no mínimo 2 caracteres"
                                            },
                                            pattern: {
                                                value: /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄçÇ\s]+$/i,
                                                message: "Digite um nome válido"
                                            },
                                        })} />
                                    {errors.district && <span className="error">{errors.district.message}</span>}
                                </div>
                            </div>
                            <div className={styles.input}>
                                <label htmlFor="address">Endereço *</label>
                                <input type="text" readOnly={true} id="address" name="address" aria-invalid={errors.address ? "true" : "false"} value={street}
                                    ref={register({
                                        required: "Campo obrigatório",
                                    })} />
                                {errors.address && <span className="error">{errors.address.message}</span>}

                            </div>
                            <div className={styles.inputDiv}>
                                <div className={styles.input}>
                                    <label htmlFor="number">Número *</label>
                                    <input type="text" id="number" name="number" aria-invalid={errors.number ? "true" : "false"} defaultValue={number}
                                        onChange={(e) => {
                                            let inputTarget = e.target;
                                            let nb = inputTarget.value;
                                            if (nb.length == 0) {
                                                setValidNumber(false)
                                            } else {
                                                setValidNumber(true)
                                            }
                                        }}
                                        ref={register({
                                            required: "Campo obrigatório",
                                            pattern: {
                                                value: /^[0-9]+$/i,
                                                message: "Digite um número válido"
                                            },
                                        })} />
                                    {errors.number && <span className="error">{errors.number.message}</span>}

                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="complement">Complemento</label>
                                    <input type="text" id="complement" name="complement" aria-invalid={errors.complement ? "true" : "false"} defaultValue={complement}
                                        ref={register({})} />
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div >
        </main >
    );
}