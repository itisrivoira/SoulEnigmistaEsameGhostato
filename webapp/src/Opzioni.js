import React from 'react'
import './Opzioni.css';
import foto from "./img/logo.png";

const Opzioni = (props) => {
    const volume=()=>{
        document.getElementById("cs_audio").volume=document.getElementById("Volume").value/100
    }
    const Apri=(apri, chiudi)=> {

        document.getElementById(apri).style.display = "flex"
        document.getElementById(chiudi).style.display = "none"
        
      }
    return (
    <div id="Option" class="Finestra">
        <img class="logo" src={foto} width="80%" ></img>
        <div id='contVol'>
            <p id='txtVolume'>Volume</p>
            <input type="range" id="Volume" onChange={()=>{volume()}}/>
        </div>
            <input type="button" class="back" value={"Torna al "+props.from} onClick={()=>Apri(props.from,"Option")}/>

    </div>
    )
}

export default Opzioni