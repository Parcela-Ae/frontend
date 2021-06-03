import React from 'react';
import styles from "../../styles/index.module.css";
import { Depositions } from '../components/depositions/depositions.component';
import { Footer } from '../components/footer/footer.component';
import { Header } from '../components/header/header.component';
import Partners from '../components/Partners/partners.component';
import FrequentlyAskedQuestions from '../components/frequently-asked-questions/frequently-asked-questions.component';



export  default function Index() {
    return (
        <>
        <header className={styles.container} >
            <Header />
            <div className={styles.containerContent}>
                <div className={styles.headerHome}>
                    <section>
                        <img src="./img/imgHead.png" className={styles.img_head} alt="Ilustração de um médico" />
                    </section>
                    <section className={styles.headerContent}>
                        <h2 className={styles.title}>Nunca foi tão simples e acessível cuidar da  sua saúde</h2>
                        <h4 className={styles.title_description}>A conta nas clínicas particulares está  complicada? Simplifica. Parcela Aê!</h4>
                        <a href="" className={styles.blueBg}>Saiba mais</a>
                    </section>
                </div>
            </div>
        </header>
        <Depositions/>
        <Partners />
        <FrequentlyAskedQuestions />
        <Footer />
        
        </>
    );
}