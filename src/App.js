import React, {useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import MonitorItem from './components/MonitorItem'

function App() {
    useEffect(() => {
      getData();
      setInterval(() =>{getData()}, 2000); //*Repetição/Atualização Automatica*//
  },  []);
  const [casos, setCasos] = useState();
  const [casosHoje, setCasosHoje] = useState();
  const [mortes, setMortes] = useState();
  const [curados, setCurados] =useState();
  const getData = async () => {
    const response = await axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/brazil"
    );
    console.log("response", response.data);
    setCasos(response.data.cases);
    setCasosHoje(response.data.todayCases);
    setMortes(response.data.deaths);
    setCurados(response.data.recovered);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p/><p/>
        <h1>Monitor COVID-19 no Brasil</h1>
        <p/>
        <div style={{display:"flex", justifyContent:"space-around", width: "100%", flexDirection:"row"}}>

        <MonitorItem
        label="Casos Totais"
        number={casos} 
        />

        <MonitorItem
        label="Hoje"
        number={casosHoje}
        increase={((casosHoje / (casos - casosHoje)) * 100).toFixed(2)}/>

        <MonitorItem
        label="Mortes"
        number={mortes} 
        increase={((mortes / casos) * 100).toFixed(2)}/>
        
        <MonitorItem
        label="Curados"
        number={curados} 
        increase={((curados / casos) * 100).toFixed(2)}/>

       </div>

  <div style={{display:"flex", justifyContent:"space-around", width: "100%", flexDirection:"row"}}>
          
   <p>Desenvolvido por 
   <a href="https://www.linkedin.com/in/paulmspessoa/"
   target="_blank"> Paul Pessoa</a> </p>
<p>Professores: <a href="https://github.com/ThiagoAugustoSM"
   target="_blank"> Thiago Augusto </a> e <a href="https://github.com/OtacilioN"
   target="_blank"> Otacilio Neto</a> Leads no Facebook Developers Circle Recife.</p>
        
        
  </div>
      </header>
    </div>
  );
}

export default App;
