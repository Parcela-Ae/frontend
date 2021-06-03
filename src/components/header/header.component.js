import Link from 'next/Link';
import styles from '../../../styles/Header.module.css';
export function Header() {
    return (
            <nav className={styles.navContainer}>
                <Link href="/">
                    <img src="./img/logo.png" alt="Logotipo do Parcela Aê" />
                </Link>
                <div className={styles.navContainerList}>
                    <ul className={styles.navContainer}>
                        <li className={styles.navContainerListItem}><Link  href="/login">Login</Link></li>
                        <li className={styles.navContainerListItem}><Link  href="/register">Cadastre-se</Link></li>
                        <li className={styles.navContainerListItem}><Link  href="/balance">Saldo</Link></li>
                        <li className={styles.navContainerListItem}><a className="pink_bg" href="#">Você é uma clínica?</a></li>
                    </ul>
                </div>
            </nav>
    );
}