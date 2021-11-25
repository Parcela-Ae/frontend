import Link from 'next/link'
import { useContext, useState } from 'react'
import Modal from "react-modal"
import styles from '../../../styles/Header.module.css'
import { AuthContext } from '../../contexts/AuthContexts'

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export function Header() {
    const { user, isAuthenticade, signOut } = useContext(AuthContext)
    const [modalIsOpen, setModalIsOpen] = useState(false)

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
                            <li className={styles.navContainerListItem}><Link href="/appointment">Agendamentos</Link></li>
                            <li className={`${styles.navContainerListItem} pink_bg`}>Olá, {user.name.split(' ')[0]}</li>
                            <li className={styles.navContainerListItem}><a href="#" onClick={()=>setModalIsOpen(true)}>Sair</a></li>
                        </>
                    )}


                    {/* <li className={styles.navContainerListItem}><a className="pink_bg" href="#">Você é uma clínica?</a></li> */}
                </ul>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
              >
                <h1>Deseja realmente sair ?</h1>
                <div className="btngrid2">
                <div className="input">
                    <button onClick={signOut}>
                    Sim
                    </button>
                </div>
                <div className="input">
                    <button onClick={() => { setModalIsOpen(false) }}>
                    Não
                    </button>
                </div>
                </div>
              </Modal>
        </nav>
    )
}