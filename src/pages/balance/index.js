import styles from '../../../styles/balance.module.css'

import { Footer } from "../../components/footer/footer.component"
import { Header } from "../../components/header/header.component"

import Historic from "../../components/historic/historic.component"
import Recharge from "../../components/recharge/recharge.component"
import Transfer from "../../components/transfer/transfer.component"
import { Balance } from "../../components/balance/balance.component"
import { parseCookies } from 'nookies'
import { useState } from "react"



export default  function balance (){
    const [isRecharge,setIsReacharge]= useState(true)
    const [isBalance,setIsBalance]= useState(false)
    const [isHistoric,setIsHistoric]= useState(false)
    const [isTransfer,setIsTransfer]= useState(false)


    function changeBalance(){
        setIsBalance(true)
        setIsReacharge(false)
        setIsHistoric(false)
        setIsTransfer(false)
    }

    function changeRecharge(){
        setIsReacharge(true)
        setIsBalance(false)
        setIsHistoric(false)
        setIsTransfer(false)
    }

    function changeHistoric(){
        setIsHistoric(true)
        setIsBalance(false)
        setIsReacharge(false)
        setIsTransfer(false)
    }
    function changeTransfer(){
        setIsTransfer(true)
        setIsHistoric(false)
        setIsBalance(false)
        setIsReacharge(false)
        
    }

    return(
        <div className={styles.bg}>
            <main className={styles.saldo}>
            <div className={styles.container}>
        
                <div className={styles.side}>
                    <div className={styles.sideLink}>
                        <a   className={isRecharge ? `sideSelect` : ""} onClick={changeRecharge}>Recarga</a>
                        <a  className={isBalance ? `sideSelect` : ""} onClick={changeBalance}>Saldo</a>
                        <a  className={isHistoric ? `sideSelect` : ""}onClick={changeHistoric} >Histórico</a>
                        <a  className={isTransfer ? `sideSelect` : ""}onClick={changeTransfer} >Transferencia</a>
                    </div>
                </div>
                {(isRecharge && <Recharge />) || (isBalance && <Balance />) || (isHistoric && <Historic />) ||  (isTransfer && <Transfer />) }
                
                </div>
        </main>
            <Footer />
        </div>
    )
}

export  async function getServerSideProps(ctx){
    const {['parcelaAe.token']:token } = parseCookies(ctx)
    if(!token){
        return{
            redirect:{
                destination: "/login",
                permanent: false
            }
        }
    }
    return{
        props:{}
    }
}