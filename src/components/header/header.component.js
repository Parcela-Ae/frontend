import Link from 'next/Link'
import { useContext } from 'react'
import styles from '../../../styles/Header.module.css'
import { AuthContext } from '../../contexts/AuthContexts'
export function Header() {
    const { user, isAuthenticade, signOut } = useContext(AuthContext)

    return (
        <nav className={styles.navContainer}>
            <a href="/">
                <img src="./img/logo.png" alt="Logotipo do Parcela Aê" />
            </a>
            <div className={styles.navContainerList}>
                <ul className={styles.navContainer}>
                    {!isAuthenticade && (
                        <>
                            <li className={styles.navContainerListItem}><Link href="/login">Login</Link></li>
                            <li className={styles.navContainerListItem}><Link href="/register">Cadastre-se</Link></li>
                        </>
                    )}
                    {isAuthenticade && (
                        <>  
                            <li className={styles.navContainerListItem}><Link href="/home">Home</Link></li>
                            <li className={styles.navContainerListItem}><Link href="/balance">Meus Créditos</Link></li>
                            <li className={`${styles.navContainerListItem} pink_bg`}>Olá, {user.name.split(' ')[0]}</li>
                            <li className={styles.navContainerListItem}><a href="#" onClick={signOut}>Sair</a></li>
                        </>
                    )}


                    {/* <li className={styles.navContainerListItem}><a className="pink_bg" href="#">Você é uma clínica?</a></li> */}
                </ul>
            </div>
        </nav>
    )
}