import styles from '../../../styles/clinic.module.css'


export default function ClinicItem() {
  return (
    <div className={styles.clinicItem}>
      <div className={styles.clinic}>
        <div className={styles.div}>
          <div className="centralizar">
            <div className={styles.clinicHeader}>
              <img src="./img/image_clinic.svg" alt="" />
              <div >
                <span>
                  <strong>nome da clinica</strong>
                </span>
                <div>
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                  <img src="/img/star.svg" alt="" />
                </div>
              </div>
            </div>

            <div>
              <span>endereço:</span>
              <p>
                zdfdsafgsdgsdgsdgsdgsdgsd
                sdgsdgsdgsdgsdgsdgsdgsdgds
              </p>
              
            </div>
            <span>Horário de Funcionamento: 12h às 18h</span>
            {/* <div className="input">
              <button>Agendar</button>
            </div> */}
          </div>
          <div>
            <span>Horário disponível</span>


          </div>
        </div>
      </div>
    </div>

  )
}