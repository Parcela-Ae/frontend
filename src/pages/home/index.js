import styles from '../../../styles/home.module.css'
import { Footer } from '../../components/footer/footer.component';
import { Header } from '../../components/header/header.component';

export default function home() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
                <main id={styles.home_logado}>
                    <div className="container">
                        <div>
                            <div className={styles.descricao_pesquisa}>
                                <h4>Agende agora a sua consulta</h4>
                                <h5>É rápido, prático e sem pesar no seu bolso</h5>
                            </div>
                        </div>
                        <div className={styles.search}>
                            <div  className={styles.searchItems}>
                                <label htmlFor="especialidade">Especialidade</label>
                                <select>
                                    <option value="">Buscar...</option>
                                </select>
                            </div>
                            <div className={styles.searchItems}>
                                <label htmlFor="local">Local</label>
                                <select>
                                    <option value="">Buscar...</option>

                                </select>
                            </div>
                            {/* <button type="submit" id={styles.img_search}>
                                    <img src="./img/search.svg" id={styles.img_search} />
                            </button> */}
                        </div>
                        {/* <div className={styles.keywords}>
                            Ginecologista • Dermatologista • Psiquiatra • Psicólogo • Ortopedista - traumatologista
                            Endocrinologista • Oftalmologista • Cardiologista • Dentista • Urologista • Neurologista
                        </div> */}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}