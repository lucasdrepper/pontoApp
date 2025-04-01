import './style/home.css';

function Home() {
  return (
    <div className="Home">
      <div className='greetings'>
        <h1>Bom dia, Lucas Costa</h1>
        <h2 className='datetime'>01 de abril de 2025</h2>
      </div>
      <div className="box-container">
        <div className='box'>
            <div className="box-content">
            <h2>Horas Extras</h2>
            <div className='overtime data'>240h
                <div className='overtime-data subtitle'>em horas extras</div>
            </div>
            <div className='overtime value'>R$3.000,00
                <div className='overtime value-subtitle'>em horas extras</div>
            </div>
            </div>
        </div>
        <div className='box'>
            <div className="box-content">
            <h2>Intervalo</h2>
            <div className='break data'>110
                <div className='break-data subtitle'>fizeram menos de 1 hora de intervalo </div>
            </div>
            <div className='break value'>R$3.000,00
                <div className='break value-subtitle'>em horas extras</div>
            </div>
            </div>
        </div>
        <div className='box'>
            <div className="box-content">
            <h2>Faltas</h2>
            <div className='break data'>200
                <div className='break-data subtitle'>Possuem faltas no mês </div>
            </div>
            <div className='break value'>150 faltas
                <div className='break value-subtitle'>justificadas</div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
