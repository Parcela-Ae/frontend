import styles from '../../../styles/transfer.module.css'
export default function Transfer() {
    return (
        <div className={styles.container}>
            <h1>Transferencia de credito</h1>
            <form action="post" className={styles.form}>
                <div>
                    <div className={styles.inputDiv}>
                        <div className={styles.input}>
                            <input id="" type="text" name="contaRecebedor" placeholder="Conta do Recebedor" />
                        </div>
                        <div className={styles.input}>
                            <input id="" type="text" name="valor" placeholder="Valor" />
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