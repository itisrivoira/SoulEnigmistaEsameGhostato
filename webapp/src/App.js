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
import merendina from "./img/merendinapx.png"
import acido from "./img/acido.jpg"
import acqua from "./img/acqua.jpg"
import chiave from "./img/chiave.jpg"
import so3 from './img/so3.jpg'

function App() {
  useEffect(() => {
    inserisci("partenza5C");
    
  }, [])
  
  const [FinestraOpt, setFinestraOpt] = useState("Home")
  const [Componente, setComponente] = useState("")
  const [Zaino,setZaino]=useState([])
  var zaino=Zaino
  var oggetti={
    acqua:acqua,
    so3:so3,
    chiave:chiave,
    acido:acido
  }

  var classi={
    schermata :Classe5C,
    schermataCor:Corridoio,
    schermataChim:Chimica
  }
  const caricaPartita=()=>{
    fetch("http://127.0.0.1:3001/caricaPartita")
    .then(response=>response.json())
    .then(data=>{
      data.zaino.map((value)=>{
      
        let obj=document.createElement("img")
        obj.src=oggetti[value.id]
        obj.id=value.id
        obj.className="oggetto"
        obj.style.width="32px"
        obj.style.height="32px"
        obj.style.margin=0
        zaino.push(obj)
        setZaino(zaino)
      })
      Cambia(classi[data.classe])
      inserisci(data.posizione)
      
    })
  }
  
  
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


  var trasportato;
  document.addEventListener("dragstart", function(event) {
    // Metto l'immagine di Soul in una variabile
    trasportato = event.target;
  }, false);

  document.addEventListener("dragover", function(event) {
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
  var counter=0

 
  document.addEventListener("drop", function(event) {

    // Inserisco l'immagine di Soul nella casella
    if (event.target.className == "casella") {
      event.target.style.background = "";
      trasportato.parentNode.removeChild( trasportato );
      event.target.appendChild( trasportato );
      trasportato.style.marginLeft="0px"
      trasportato.style.marginTop="0px"
    }else if (event.target.id == "Zaino") {
      let flag=0
      if (trasportato.className=="oggetto") {
        event.target.style.background = "";
        trasportato.parentNode.removeChild( trasportato);
        event.target.appendChild( trasportato);
        trasportato.style.width="32px"
        trasportato.style.height="32px"
        trasportato.style.margin=0
        zaino=Zaino
        zaino.map((obj)=>{
          
          if(obj.id==trasportato.id){
            flag=1
          }
        })
        if (flag==0){
          zaino.push(trasportato)
          
        }
        setZaino(zaino)
      }
      
    }else if(event.target.id=="imgBancone"){
      if(trasportato.parentNode!=null){
        trasportato.parentNode.removeChild( trasportato );
      }

      zaino.splice(0,1)
      
      if(counter==1){
        let oggetto=document.createElement("img");
        oggetto.src=acido
        oggetto.className="oggetto"
        oggetto.draggable=true
        oggetto.id="acido"
        let flag=0
        zaino.map((obj)=>{
          
          if(obj.id=="acido"){
            flag=1
          }
        })
        if (flag==0){
          zaino.push(oggetto)
          
        }
        
        counter=0
      }else{
        counter=1
      
      }
      setZaino(zaino)
    }else if(event.target.id=="imgArmadioChimLock"){
      
      if(trasportato.id=="acido"){
        zaino=Zaino
        zaino.filter(obj=>obj.id==trasportato.id)
        setZaino(zaino)
        if(trasportato.parentNode!=null){
          trasportato.parentNode.removeChild( trasportato );
        }
        
        event.target.id="imgArmadioChimOpen"
        creaOggetto(chiave,"chiave",event.target)
        
      }
      
      document.getElementById("armadioChimLock").id="armadioChimOpen"
    }else if(event.target.id=="imgArmadio5CLock"){
      if(trasportato.id=="chiave"){
        if(trasportato.parentNode!=null){
          trasportato.parentNode.removeChild( trasportato );
        }
        zaino=Zaino
        zaino.filter(obj=>obj.id==trasportato.id)
        setZaino(zaino)
        event.target.id="imgArmadio5COpen"
        document.getElementById("armadio").id="armadio5COpen"
      }
      
    }
       
    
  }, false);

  const creaicona=(contenitore,src,onclick)=>{
    var icona=document.createElement("img")
    icona.src=src
    icona.className="icona"
    icona.addEventListener('click',()=>{onclick(contenitore)});
    contenitore.appendChild(icona)
  }
  const creaOggetto=(img,id,schermo)=>{
    
    let flag=0
    zaino=Zaino
    zaino.map((value)=>{
        if(value.id==id){
          flag=1
        }

      })
      if (flag==0){
        let oggetto=document.createElement("img");
        oggetto.src=img
        oggetto.className="oggetto"
        oggetto.draggable=true
        oggetto.id=id
        schermo.appendChild(oggetto)
      }
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
    var schermataChim=document.getElementById("schermataChim")
    //alert(charCode)
    if (charCode==13) {
      var Posizione=document.getElementById("soul").parentNode.id
      switch (Posizione) {
        case "armadio":
          if(!schermata.contains(document.getElementsByClassName("schermata2")[0])){
            var armadio = document.createElement("div");
            armadio.id="imgArmadio5CLock"
            armadio.className="schermata2"
            schermata.appendChild(armadio)
          }
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
        case "armadioChim":
          if(!schermataChim.contains(document.getElementsByClassName("schermata2")[0])){
            var armadio = document.createElement("div");
            armadio.id="imgArmadioChim"
            armadio.className="schermata2"
            schermataChim.appendChild(armadio)
            creaOggetto(acqua,"acqua",armadio)
            creaOggetto(so3,"so3",armadio)
            }
          break;
          case "armadioChimLock":
            if(!schermataChim.contains(document.getElementsByClassName("schermata2")[0])){
              var armadio = document.createElement("div");
              armadio.id="imgArmadioChimLock"
              armadio.className="schermata2"
              schermataChim.appendChild(armadio)
            }
            break;
          case "banconeChim6":
            if(!schermataChim.contains(document.getElementsByClassName("schermata2")[0])){
              var bancone = document.createElement("div");
              bancone.id="imgBancone"
              bancone.value=0
              bancone.className="schermata2"
              schermataChim.appendChild(bancone)
            }
           break;
          case "armadioChimOpen":
            if(!schermataChim.contains(document.getElementsByClassName("schermata2")[0])){
              var armadio = document.createElement("div");
              armadio.id="imgArmadioChimOpen"
              armadio.className="schermata2"
              schermataChim.appendChild(armadio)
              creaOggetto(chiave,"chiave",armadio)
              
            }
            break;
          case "armadio5COpen":
            if(!schermata.contains(document.getElementsByClassName("schermata2")[0])){
              var armadio = document.createElement("div");
              armadio.id="imgArmadio5COpen"
              armadio.className="schermata2"
              schermata.appendChild(armadio)
              
            }
        default:
          alert(document.getElementById("soul").parentNode.id)
          break;
      }
    }else if (charCode==37) {
      if(document.contains(document.getElementsByClassName("schermata2")[0])){
        var computer=document.getElementsByClassName("schermata2")[0]
        if(computer.contains(document.getElementsByClassName("schermata3")[0])){
          var icone=document.getElementsByClassName("schermata2")[0].childNodes
          for (let i = 0; i < icone.length; i++) {
            icone[i].style.display="inline-block"
          }
          computer.removeChild(document.getElementsByClassName("schermata3")[0])
        }else{
          document.getElementsByClassName("schermata2")[0].parentNode.removeChild(document.getElementsByClassName("schermata2")[0])
        }
       
      }
     
    }else if (charCode==77){
      zaino=Zaino
      
      var finestra=document.getElementById("Contenitore")
        if (finestra.contains(document.getElementById("Zaino"))) {
          finestra.removeChild(document.getElementById("Zaino"))
        }else{
          var menuZaino = document.createElement("div");
          menuZaino.id="Zaino"
          console.log(zaino)
          finestra.appendChild(menuZaino)
          zaino.map((value)=>{
            
            menuZaino.append(value)
          })
        }
      
    }else if (charCode==79){
      Apri("Option","Gioco")
      
    }else if(charCode==72){
      Apri("Home","Gioco") 
    }else if(charCode==83){

      let dati={
        posizione:document.getElementById("soul").parentNode.id,
        classe:document.getElementsByClassName("classe")[0].id,
        zaino:[]
    }
      zaino.map((value)=>{
        dati.zaino.push({id:value.id})
      })
      fetch("http://127.0.0.1:3001/salva",{
        method:"POST",
        headers:{'Content-Type':'application/json;charset=utf-8'},
        body:JSON.stringify(dati)
      }).then(response=>response.json()).then(data=>console.log(data))
    }
  }
  return (

    <div id='Contenitore'>
      
      <div id="Home" class="Finestra">
      <img class="logo" src={foto} width="80%" ></img>
        <div id="pulsanti">
          <input id='play' type="button" value="PLAY"  onClick={()=>Apri("Gioco","Home") }/>
          <input id='play' type="button" value="Carica Partita"  onClick={()=>{Apri("Gioco","Home");caricaPartita() }}/>
          
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
