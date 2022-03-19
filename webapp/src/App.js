import * as React from 'react';

import { useState } from 'react';
import './App.css';
import Opzioni from './Opzioni';
import foto from "./img/logo.png";
import imagine from "./audio/imagine.mp3";
import Classe5C from './Classe5C';



function App() {
  const [FinestraOpt, setFinestraOpt] = useState("Home")
 
 
  const Apri=(apri, chiudi)=> {

    document.getElementById(apri).style.display = "flex"
    document.getElementById(chiudi).style.display = "none"
    setFinestraOpt(chiudi)
  }
  
  return (

    <div id='Contenitore'>
      
      <div id="Home" class="Finestra">
      <img class="logo" src={foto} width="80%" ></img>
        <div id="pulsanti">
          <input id='play' type="button" value="PLAY"  onClick={()=>Apri("Gioco","Home") }/>
          <input class='option' type="button" value="OPTION"  onClick={()=>Apri("Option","Home") }/>
        </div>
      </div>
      <Opzioni from={FinestraOpt}/>
      
      <div id="Gioco" class="Finestra">
        <Classe5C />
        <div id="pulsantiGioco">
            <input type="button" class="back" value="Torna al Menu" onClick={()=>Apri("Home","Gioco")}/>
            <input class='back' type="button" value="OPTION"  onClick={()=>Apri("Option","Gioco") }/>
        </div>      
      </div>
      <audio id="cs_audio" loop controls autoPlay hidden="true">
        <source src={imagine} type="audio/mpeg"/>
      </audio>
    </div>
    
  );
}

export default App
