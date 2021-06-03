import React from 'react';
import styles from '../../../styles/FrequentlyAskedQuestions.module.css';
export default function FrequentlyAskedQuestions() {
    return (
        <div className={styles.duvidas}>
            <h3 className={styles.duvidas_title}>Dúvidas frequentes</h3>
            <div className={styles.container}>
                <div>
                    <h5>O que é o ParcelaAê?</h5>
                    <p className={styles.descricao_duvida}>
                        Sabemos que o pagamento interino de uma consulta pode acabar sendo muito pesado para o bolso, por
                        isso, transformamos esse pagamento em pequenas parcelas para o consumidor.
                    </p>
                </div>
                <div >
                    <h5>O que é o ParcelaAê?</h5>
                    <p className={styles.descricao_duvida}>
                        Sabemos que o pagamento interino de uma consulta pode acabar sendo muito pesado para o bolso, por
                        isso, transformamos esse pagamento em pequenas parcelas para o consumidor.
                    </p>
                </div>

                <div >
                    <h5>O que é o ParcelaAê?</h5>
                    <p className={styles.descricao_duvida}>
                        Sabemos que o pagamento interino de uma consulta pode acabar sendo muito pesado para o bolso, por
                        isso, transformamos esse pagamento em pequenas parcelas para o consumidor.
                    </p>
                </div>
                <div >
                    <h5>O que é o ParcelaAê?</h5>
                    <p className={styles.descricao_duvida}>
                        Sabemos que o pagamento interino de uma consulta pode acabar sendo muito pesado para o bolso, por
                        isso, transformamos esse pagamento em pequenas parcelas para o consumidor.
                    </p>
                </div>
            </div>
        </div>
    );
}