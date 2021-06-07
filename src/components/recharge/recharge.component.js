import styles from '../../../styles/recharge.module.css'
export default function Recharge() {
    return (
        <div className={styles.container}>
            <h1>Dados do cartão</h1>
            <form action="post" className={styles.form}>
                <div>
                    <div className={styles.inputDiv}>
                        <div className={styles.input}>
                            <input id="" type="text" name="NUMERO_CARTAO" placeholder="Número do cartão" />
                        </div>
                        <div className={styles.input}>
                            <input id="" type="text" name="name" placeholder="Nome do Titular" />
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.input}>
                            <input id="" type="text" name="" placeholder="Data de Expiração" />
                        </div>

                        <div className={styles.input}>
                            <input id="cvv" type="text " name="cvv" placeholder="CVV" />
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.input}>
                            <input id="text" type="text " name="valor" placeholder="Valor" />
                        </div>

                        <div className={styles.input}>
                            <select>
                                <option value="">Selecione a quantidade de parcelas *</option>
                                <option value="1">1x de R$&nbsp;475,00 sem juros</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.input}>
                        <button >Realizar Recarga</button>
                    </div>
                </div>
            </form>
        </div>

    )
}