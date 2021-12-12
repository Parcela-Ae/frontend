import React from 'react'
import styles from '../../../styles/FrequentlyAskedQuestions.module.css'
export default function FrequentlyAskedQuestions() {
    return (
        <div className={styles.duvidas}>
            <h3 className={styles.duvidas_title}>Dúvidas frequentes</h3>
            <div className={styles.container}>
                <div>
                    <a>O que é o ParcelaAê?</a>
                    <p className={styles.descricao_duvida}>
                        Uma forma simples e prática para parcelar uma consulta praticular. O pagamento interino de uma consulta pode acabar sendo muito pesado para o bolso, por isso, transformamos esse pagamento em pequenas parcelas para o consumidor.
                    </p>
                </div>

                <div >
                    <a>Como funcionam as consultas online?</a>
                    <p className={styles.descricao_duvida}>
                        Consultas online ajudam você a ter ajuda do seu profissional de saúde de maneira remota.Você poderá se consultar com um especialista e resolver suas dúvidas de saúde sem a necessidade de sair de casa.
                    </p>
                </div>

                <div >
                    <a>O que acontece quando o cadastro é confirmado?</a>
                    <p className={styles.descricao_duvida}>
                        O cadastro é confirmado quando o usuário clica no link de ativação que é enviado por email, depois de ter sido feito o cadastro.Clicar no link ativa automaticamente a conta.
                    </p>
                </div>

                <div >
                    <a>Não recebi o e-mail com o link para ativar a minha conta, e agora?</a>
                    <p className={styles.descricao_duvida}>
                        Verifique a caixa de SPAM do seu e-mail.Muitas vezes, mensagens automáticas são enviadas para esta pasta, pode ter acontecido isto em seu caso!
                    </p>
                </div>

                <div >
                    <a>Não consigo fazer login na minha conta ou não consigo lembrar da minha senha, o que posso fazer?</a>
                    <p className={styles.descricao_duvida}>
                        Tenha certeza que está usando o mesmo email do cadastro inicial, depois, utilize a função relembrar a senha.Te enviaremos algumas informações adicionais para recuperar sua senha.
                    </p>
                </div>

                <div >
                    <a>Em quantas vezes posso parcelar meu pagamento? Quais os meios de pagamento?</a>
                    <p className={styles.descricao_duvida}>
                        O pagamento pode ser parcelado em até 12 vezes sem juros e a forma de pagamento é cartão de crédito ou débito.
                    </p>
                </div>
            </div>
        </div >
    )
}