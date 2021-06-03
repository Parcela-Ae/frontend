import styles from '../../../styles/balance.module.css';

export function Balance() {
    return (
        <div className={styles.content}>
            <div className="container" >
                <div className={styles.card}>
                        <div>
                            <h5> <strong>Saldo</strong></h5>
                            <h1> <strong>1500</strong></h1>
                            <p>créditos</p>
                        </div>
                        <div >
                            <h5><strong>última recarga</strong></h5>
                            <h6>3500 Créditos - 25/06</h6>
                            <a href="">ver mais</a>
                        </div>
                </div>
            </div>
        </div>
    );
}