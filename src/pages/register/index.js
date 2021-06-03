import styles from '../../../styles/register.module.css';
import { Footer } from '../../components/footer/footer.component';
import { Header } from '../../components/header/header.component';
import  Register  from '../../components/register/register.component';



export default function register() {
    return (
        <div className={styles.bg}>
            <Header />
            <Register />
            <Footer/>
        </div>
    );
}