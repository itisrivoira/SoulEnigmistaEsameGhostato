import * as React from 'react';

import { useState,useEffect } from 'react';
import './App.css';
import Opzioni from './Opzioni';
import foto from "./img/logo.png";
import imagine from "./audio/imagine.mp3";
import Classe5C from './Classe5C';
import imgReg from "./img/applicazioni/registro.png"
import appBlocc from "./img/applicazioni/appBlocc.png"
import Corridoio from './Corridoio';
import Chimica from './Chimica';
import soul from "./img/fantasmaPixel.png"

function App() {
  useEffect(() => {
    inserisci("partenza5C")
  }, [])
  
  const [FinestraOpt, setFinestraOpt] = useState("Home")
  const [Componente, setComponente] = useState("")
  const [Zaino,setZaino]= useState([])
  
  
  const Apri=(apri, chiudi)=> {
    document.getElementById(apri).style.display = "flex"
    document.getElementById(chiudi).style.display = "none"
    setFinestraOpt(chiudi)
  }

  const Cambia=(comp)=>{
    if (document.contains(document.getElementById("5c"))) {
      document.getElementById("5c").parentNode.removeChild(document.getElementById("5c"))
    }
    setComponente(comp)
  }


  const inserisci=(pos)=>{
    if (document.contains(document.getElementById("soul"))) {
        document.getElementById("soul").parentNode.removeChild((document.getElementById("soul")))
    }
    let imgSoul=document.createElement("img")
    imgSoul.src=soul
    imgSoul.id="soul"
    imgSoul.draggable=true
    document.getElementById(pos).appendChild(imgSoul)
    
  }


  var Soul;
  document.addEventListener("dragstart", function(event) {
    // Metto l'immagine di Soul in una variabile
    Soul = event.target;
  }, false);

  document.addEventListener("dragover", function(event) {
    // Metto l'immagine di Soul in una variabile
    event.preventDefault()
  }, false);
  
  document.addEventListener("dragenter", function(event) {
    // coloro la casella su cui passo sopra
    if (event.target.className == "casella") {
      event.target.style.background = "purple";
    }
  
  }, false);
  
  document.addEventListener("dragleave", function(event) {
    // quando poso soul faccio tornare la casella traspaente
    if (event.target.className == "casella") {
      event.target.style.background = "";
    }
  
  }, false);
  
  document.addEventListener("drop", function(event) {

    // Inserisco l'immagine di Soul nella casella
    if (event.target.className == "casella") {
      event.target.style.background = "";
      Soul.parentNode.removeChild( Soul );
      event.target.appendChild( Soul );
      Soul.style.marginLeft="0px"
      Soul.style.marginTop="0px"
    }
  }, false);

  const creaicona=(contenitore,src,onclick)=>{
    var icona=document.createElement("img")
    icona.src=src
    icona.className="icona"
    icona.addEventListener('click',()=>{onclick(contenitore)});
    contenitore.appendChild(icona)
  }

  const apriRegistro=(computer)=>{
    var registro = document.createElement("div");
    var icone = computer.childNodes;

    for (let i = 0; i < icone.length; i++) {
      icone[i].style.display="none"
    }
    registro.id="registro"
    registro.className="schermata3"
    computer.appendChild(registro)
    

  }

  const nonFaccioNiente=()=>{
    return null
  }

  document.onkeyup=function(e) {
    var charCode = e.keyCode;
    var schermata=document.getElementById("schermata")
    //alert(charCode)
    if (charCode==13) {
      var Posizione=document.getElementById("soul").parentNode.id
      switch (Posizione) {
        case "armadio":
          alert("Sei davanti all'armadio")
          break;
        case "computer":
          if(!schermata.contains(document.getElementsByClassName("schermata2")[0])){
            var computer = document.createElement("div");
            computer.id="imgComputer"
            computer.className="schermata2"
            schermata.appendChild(computer)
            creaicona(computer,imgReg,apriRegistro)
            creaicona(computer,appBlocc,nonFaccioNiente)
          }
         
          break;
        case "lavagna":
          if(!schermata.contains(document.getElementsByClassName("schermata2")[0])){
            var lavagna = document.createElement("div");
            lavagna.id="imgLavagna"
            lavagna.className="schermata2"
            schermata.appendChild(lavagna)
          }
          break;

        case "porta5C":
          Cambia(Corridoio)
          inserisci("partenzaCor")
          break;
        case "cestini":
          alert("SOUL:I cestini sono vuoti...")
          break;
        case "partenza5C":
          alert("SOUL:La mia vecchia classe...")
          break;
        case "partenzaCor":
          Cambia(Classe5C)
          inserisci("porta5C")
          break;
        case "portaCor":
          Cambia(Chimica)
          inserisci("partenzaChim")
          break;
        case "partenzaChim":
          Cambia(Corridoio)
          inserisci("portaCor")
          break;
        default:
          alert(document.getElementById("soul").parentNode.id)
          break;
      }
    }
    if (charCode==37) {
      if(schermata.contains(document.getElementsByClassName("schermata2")[0])){
        var computer=document.getElementsByClassName("schermata2")[0]
        if(computer.contains(document.getElementsByClassName("schermata3")[0])){
          var icone=document.getElementsByClassName("schermata2")[0].childNodes
          for (let i = 0; i < icone.length; i++) {
            icone[i].style.display="inline-block"
          }
          computer.removeChild(document.getElementsByClassName("schermata3")[0])
        }else{
          schermata.removeChild(document.getElementsByClassName("schermata2")[0])
        }
        
      }
      
    }
    if (charCode==77){
      var finestra=document.getElementById("Contenitore")
        if (finestra.contains(document.getElementById("Zaino"))) {
          finestra.removeChild(document.getElementById("Zaino"))
        }else{
          var menuZaino = document.createElement("div");
          menuZaino.id="Zaino"
          finestra.appendChild(menuZaino)
          Zaino.map((value)=>{
            menuZaino.append(value)
          })
        }
      
    }
    if (charCode==79){
      Apri("Option","Gioco")
      
    }
    if(charCode==72){
      Apri("Home","Gioco") 
    }
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
        <div id="5c">
          <Classe5C/>
        </div>
        {Componente}
        
      </div>
      <audio id="cs_audio" loop controls autoPlay hidden="true">
        <source src={imagine} type="audio/mpeg"/>
      </audio>
    </div>
    
  );
}

export default App
