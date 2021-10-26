import Link from 'next/link'
import styles from '../../../styles/depositions.module.css'
export function Depositions() {
    return (
        <div className={styles.depoimentos}>
            <div className={styles.depoimentos_home}>
                <div className={styles.depoimentos_items}>
                    <div className={styles.depoimentos_perfil}>

                        <div className={styles.depoimentos_rating}>
                            <img src="./img/img-profile.png" alt="" className={styles.img_profile} />
                            <div className={styles.depoimentos_ratingItems}>
                                Mariana Silva
                                <div>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                </div>
                            </div>

                        </div>
                        <p className={styles.depoimento}>
                            Aqui em casa, depois que descobrimos o ParcelaAê, passamos a usar sempre! Mesmo quando não há
                            descontos liberados, a chance de parcelar em valores que cabem no nosso bolso é muito bom.
                            
                        </p>
                    </div>
                </div>
                <div className={styles.depoimentos_items}>
                    <div className={styles.depoimentos_perfil}>

                        <div className={styles.depoimentos_rating}>
                            <img src="./img/img-profile.png" alt="" className={styles.img_profile} />
                            <div className={styles.depoimentos_ratingItems}>
                                Mariana Silva
                                <div>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                </div>
                            </div>

                        </div>
                        <p className={styles.depoimento}>
                            Aqui em casa, depois que descobrimos o ParcelaAê, passamos a usar sempre! Mesmo quando não há
                            descontos liberados, a chance de parcelar em valores que cabem no nosso bolso é muito bom.
                            
                        </p>
                    </div>
                </div>
                <div className={styles.depoimentos_items}>
                    <div className={styles.depoimentos_perfil}>

                        <div className={styles.depoimentos_rating}>
                            <img src="./img/img-profile.png" alt="" className={styles.img_profile} />
                            <div className={styles.depoimentos_ratingItems}>
                                Mariana Silva
                                <div>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                </div>
                            </div>

                        </div>
                        <p className={styles.depoimento}>
                            Aqui em casa, depois que descobrimos o ParcelaAê, passamos a usar sempre! Mesmo quando não há
                            descontos liberados, a chance de parcelar em valores que cabem no nosso bolso é muito bom.
                            
                        </p>
                    </div>
                </div>    
            </div>
            <div className={styles.cadastro}>
                <div className="">
                    <span>
                        <h4>O que você está esperando? Aproveite também!</h4>
                        <Link href="/register">
                            <a href="" className="pink_bg">Cadastre-se</a>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}