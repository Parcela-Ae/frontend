import { useEffect } from 'react'
import styles from '../../../styles/historic.module.css'
import ClinicService from '../../services/clinic.service'

export  default function Test() {
    return (
        
        <div className={styles.historic}>
            <div className={styles.content}>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>#785463-1</th>
                            <td>02/07/2019</td>
                            <td>R$ 50,00</td>
                            <td><a href=" ">detalhes</a></td>
                        </tr>
                        <tr>
                            <th>#785463-1</th>
                            <td>02/07/2019</td>
                            <td>R$ 50,00</td>
                            <td><a href=" ">detalhes</a></td>
                        </tr>
                        <tr>
                            <th>#785463-1</th>
                            <td>02/07/2019</td>
                            <td>R$ 50,00</td>
                            <td><a href=" ">detalhes</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}