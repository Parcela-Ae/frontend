import { useEffect, useState } from 'react'
import styles from '../../../styles/login.module.css'
import Test from '../../components/test/test.component'
import Clinic from '../../models/clinic.model'
import ClinicService from '../../services/clinic.service'

export default function test() {
    const [clinic,setClinic] = useState()
    const [products, setProducts] = useState([]);
    useEffect(() => {
		ClinicService.findAll()
        .then(response => setProducts(response.data))
    }, [])
    return (
        <div className={styles.bg}>
        </div>
    )
}