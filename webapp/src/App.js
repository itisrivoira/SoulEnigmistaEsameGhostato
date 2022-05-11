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
import Bakeracqua from './img/baker1.png'
import Bakerso3 from './img/baker2.png'
import Bakeracido from './img/baker3.png'

function App() {  //inserisco le variabili
  useEffect(() => {
    inserisci("partenza5C");
  }, [])
  var counter=0
  const [FinestraOpt, setFinestraOpt] = useState("Home")  //Finestra opzioni
  const [Componente, setComponente] = useState("")  //quale componente visulaizzo
  const [Zaino,setZaino]=useState([])   //array di zaino
  const [utente,setUtente]=useState([])  //id dell'utente
  const [aCL,setaCL]=useState(0) //armadio è chiuso o aperto

  var baker=document.createElement("img")
  baker.className="oggetto"
  baker.id="baker"
  baker.style.marginTop="110px"
  baker.style.marginLeft="64px"
  
  var zaino=Zaino
  var oggetti={   //ad ogni id corrisponde un immagine perchè non può accedere direttamente al file system ma inserire i file
    acqua:acqua,
    so3:so3,
    chiave:chiave,
    acido:acido
  }
 
//oggetto classi con chiave id e valore con l'immagine della classe
  var classi={
    schermata :Classe5C,
    schermataCor:Corridoio,
    schermataChim:Chimica
  }
  const caricaPartita=()=>{
    fetch("http://127.0.0.1:3001/caricaPartita",{
      method:"POST",
      headers:{'Content-Type':'application/json;charset=utf-8'},
      body:JSON.stringify({utente:utente})
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      data.zaino.map((value)=>{ //per ogni oggetto nello zaino lo aggiungo
      
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
      if(data.acl==1){
        Cambia(Chimica)
        document.getElementById("armadioChimLock").id="armadioChimOpen"
      }
      Cambia(classi[data.classe]) //cambiare classe
      inserisci(data.posizione) //inserire soul
      
      
    })
  }
  
  
  const Apri=(apri, chiudi)=> {
    document.getElementById(apri).style.display = "flex"
    document.getElementById(chiudi).style.display = "none"
    setFinestraOpt(chiudi)
  }

  const banconeChim=()=>{   //on drop del bancone e se counter è 1 allora crea l'oggetto acido
    trasportato.parentNode.removeChild( trasportato );
    zaino=zaino.filter(obj=>obj.id!=trasportato.id)
    console.log(zaino)
    if(counter==1){
      let oggetto=document.createElement("img");
      oggetto.src=acido
      oggetto.className="oggetto"
      oggetto.draggable=true
      oggetto.id="acido"
      baker.id="acido"
    }else{
      counter=1
      
      baker.id=trasportato.id

    }
    
    
    switch (baker.id) {
      case "baker":
        baker.src=Bakeracqua
        break;
      case "acqua":
        baker.src=Bakeracqua
        break;
      case "so3":
        baker.src=Bakerso3
        break;
      case "acido":
        baker.src=Bakeracido
        baker.draggable=true
        break;
      default:
        break;
    }
    document.getElementsByClassName("schermata2")[0].removeChild(baker)
    document.getElementsByClassName("schermata2")[0].appendChild(baker)   //aggiono eliminandolo e rimettendolo

  }

 
  const login=()=>{
    let user={
      nick:document.getElementById("nick").value, //litteral object
      password: document.getElementById("password").value
    }
   
    fetch("http://127.0.0.1:3001/login",{
        method:"POST",
        headers:{'Content-Type':'application/json;charset=utf-8'},  //sto mandando i dati in json
        body:JSON.stringify(user)//trasforma in json il litteral object
      }).then(response=>response.json()).then(data=>{
        if (data.response) {
          setUtente(data.response[0].id)
          console.log("id utente: "+data.response[0].id)
          Apri("homeLog","login") //cambia immagine
        }else{
          console.log("utente non trovato")
          alert("utente non trovato")
        }
      })
    }

  const Cambia=(comp)=>{    //cambia il componente
    if (document.contains(document.getElementById("5c"))) {
      document.getElementById("5c").parentNode.removeChild(document.getElementById("5c"))
    }
    setComponente(comp)
  }


  const inserisci=(pos)=>{    //inserisce soul in una casella
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
    trasportato = event.target; //oggetto che sto spostando
  }, false);

  document.addEventListener("dragover", function(event) {
    event.preventDefault()  //annulla tutte le funzioni di default
  }, false);
  
  document.addEventListener("dragenter", function(event) {
    // coloro la casella su cui passo sopra
    if (event.target.className == "casella") {
      event.target.style.background = "purple";
    } //colora di viola la casella dove passa soul
  
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
      
    }else if(event.target.id=="imgArmadioChimLock"){
      
      if(trasportato.id=="acido"){
        zaino=Zaino
        zaino=zaino.filter(obj=>obj.id!="acido")
        setZaino(zaino)
        
        trasportato.parentNode.removeChild( trasportato );
        
        
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
        zaino=zaino.filter(obj=>obj.id!=trasportato.id)
        
        event.target.id="imgArmadio5COpen"
        document.getElementById("armadio").id="armadio5COpen"
        setZaino(zaino)
        setZaino(zaino)
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
    if(document.getElementById("Gioco").style.display == "flex"){
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
                bancone.ondragover=(event)=>event.preventDefault
                bancone.ondrop=banconeChim
                switch (baker.id) {
                  case "baker":
                    baker.src=Bakeracqua
                    break;
                  case "acqua":
                    baker.src=Bakeracqua
                    break;
                  case "so3":
                    baker.src=Bakerso3
                    break;
                  case "acido":
                    baker.src=Bakeracido
                    baker.draggable=true
                    break;
                  default:
                    break;
                }
                baker.style.width="250px"
                baker.style.height="274px"
                bancone.appendChild(baker)
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
        Apri("homeLog","Gioco") 
      }else if(charCode==83){
        if (document.contains(aCL)) {
          var lock=0
        }else{
          lock=1
        }
        let dati={
          utente:utente,
          acl:lock, //0 se l'armadio di chimica è chiuso e 1 se è aperto
          posizione:document.getElementById("soul").parentNode.id,  //id della casella di Soul
          classe:document.getElementsByClassName("classe")[0].id, //id della classe dov'è soul
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
  }
  return (

    <div id='Contenitore'>
      
      <div id="Home" class="Finestra">
        <img class="logo" src={foto} width="80%" ></img>
          <div id="pulsanti">
            <input id='Loginbt' type="button" value="Login"  onClick={()=>Apri("login","Home") }/>
          
            <input class='option' type="button" value="OPTION"  onClick={()=>Apri("Option","Home") }/>
          </div>
      </div>

      <div id="login" hidden>
        <img class="logo" src={foto} width="80%" ></img>
        
        <div id="pulsanti">
          <input type="text" id="nick" name="nick" placeholder="Inserisci nick" required />
          <input type="text" id="password" name="password" placeholder="Inserisci password" required />
          
          <input type="button" onClick={()=>{login()}} value="Login"/>
          <input class='option' type="button" value="OPTION"  onClick={()=>Apri("Option","login") }/>
          
        </div>
        
      </div>

      <div id="homeLog" hidden>
        <img class="logo" src={foto} width="80%" ></img>
        
        <div id="pulsanti">
          <input id='play' type="button" value="PLAY"  onClick={()=>Apri("Gioco","homeLog") }/>
          <input id='play' type="button" value="Carica Partita"  onClick={()=>{Apri("Gioco","homeLog");caricaPartita() }}/>
        </div> 
      </div>
      <Opzioni from={FinestraOpt}/>
      
      <div id="Gioco" class="Finestra">
        <div id="5c">
          <Classe5C/>
        </div>
        {Componente}
        
      </div>
      
      <audio id="cs_audio" loop controls autoPlay hidden>
        <source src={imagine} type="audio/mpeg"/>
      </audio>
    </div>
    
  );
}

export default App
