import * as React from 'react';

import './App.css';
import foto from "./img/logo.png";
import imagine from "./audio/imagine.mp3";

function App() {

 
 
  const Apri=(apri, chiudi)=> {

    document.getElementById(apri).style.display = "flex"
    document.getElementById(chiudi).style.display = "none"
  }
  const volume=()=>{
    document.getElementById("cs_audio").volume=document.getElementById("Volume").value/100
  }
  return (

    <div id='Contenitore'>
      
      <img id="logo" src={foto} width="80%" ></img>
      <div id="Home" class="Finestra">
        <div id="pulsanti">
          <input id='play' type="button" value="PLAY"/>
          <input id='option' type="button" value="OPTION"  onClick={()=>Apri("Option","Home") }/>
        </div>
      </div>
      <div id="Option" class="Finestra">
        <div id='contVol'>
        <p id='txtVolume'>Volume</p>
        <input type="range" id="Volume" onChange={()=>{volume()}}/>
        </div>
        
        <input type="button" id="back" value="Torna al Menu" onClick={()=>Apri("Home","Option")}/>
       
      </div>
      <audio id="cs_audio" loop controls autoPlay hidden="true">
        <source src={imagine} type="audio/mpeg"/>
      </audio>
    </div>
    
  );
}

export default App
