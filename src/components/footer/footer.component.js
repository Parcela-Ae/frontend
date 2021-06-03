import styles from '../../../styles/footer.module.css';
export function Footer() {
    return (
        <>
        <footer id={styles.footer}>
            <div>
                <div className={styles.footerContent}>

                    <div className={styles.coluna}>
                        <h4>Serviços</h4>
                        <ul>
                            <li><a href="">Sobre nós</a></li>
                            <li><a href="">Privacidade</a></li>
                            <li><a href="">Serviços</a></li>
                        </ul>
                    </div>
                    <div className={styles.coluna}>
                        <h4>Clientes</h4>
                        <ul>
                            <li><a href="">Como funciona</a></li>
                            <li><a href="">Termos</a></li>
                            <li><a href="">Descontos</a></li>
                        </ul>
                    </div>
                    <div className={styles.coluna}>
                        <h4>Links úteis</h4>
                        <p>
                            Oferecemos visibilidade direta à clientes reais, agendamento e gestão das consultas, tudo sem
                            nenhuma complicação. Cuide do paciente e nós cuidamos do resto!
                        </p>
                        <a href="" className="pink_bg">Saiba Mais</a>
                    </div>
                    <div className={styles.coluna}>
                        <img src="./img/logo-branca.png" alt="parcelae"/>
                        <p>Parcela Aê Serviços e Software LTDA Rua Osvaldo Lima, 130, Derby - Recife. CEP: 52010-180</p>
                        <p>atendimento@parcelaae.com.br</p>
                        <div className={styles.rede_social}>
                            <a href="" ><img src="./img/image_2.png" /></a>
                            <a href="" ><img src="./img/image_3.png" /></a>
                            <a href="" ><img src="./img/image_4.png" /></a>
                            <a href="" ><img src="./img/image_5.png" /></a>
                        </div>
                    </div>
                </div>
            </div>
            
        </footer>
        <div className={styles.copy}>
                <p>
                    Made with love and coffe. © 2020
                </p>
            </div>
        </>
    );
}