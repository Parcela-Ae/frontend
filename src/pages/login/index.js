import styles from '../../../styles/login.module.css'
import Login from '../../components/login/login.component'

export default function login() {
    return (
        <div className={styles.bg}>
            <Login />
        </div>
    )
}