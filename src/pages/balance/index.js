import styles from '../../../styles/balance.module.css'

import { Footer } from "../../components/footer/footer.component"
import { Header } from "../../components/header/header.component"

import Historic from "../../components/historic/historic.component"
import { useEffect, useState } from "react"
import Recharge from "../../components/recharge/recharge.component"
import Transfer from "../../components/transfer/transfer.component"
import { Balance } from "../../components/balance/balance.component"



export default  function balance (){

    const [isBalance,setIsBalance]= useState(true)
    const [isHistoric,setIsHistoric]= useState(false)
    const [isRecharge,setIsReacharge]= useState(false)
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
            <Header />
            <main className={styles.saldo}>
            <div className={styles.container}>

                <div className={styles.side}>
                    <div className={styles.sideLink}>
                        <a  className={isBalance ? `sideSelect` : ""} onClick={changeBalance}>Saldo</a>
                        <a   className={isRecharge ? `sideSelect` : ""} onClick={changeRecharge}>Recarga</a>
                        <a  className={isHistoric ? `sideSelect` : ""}onClick={changeHistoric} >Histórico</a>
                        <a  className={isTransfer ? `sideSelect` : ""}onClick={changeTransfer} >Transferencia</a>
                    </div>
                </div>
                {(isBalance && <Balance />) || (isHistoric && <Historic />) || (isRecharge && <Recharge />) || (isTransfer && <Transfer />) }
                
                </div>
        </main>
            <Footer />
        </div>
    )
}