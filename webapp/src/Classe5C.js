import React from 'react'
import './Classe5C.css';

import soul from "./img/fantasmaPixel.png"
const Classe5C = () => {
    var Soul;

    document.addEventListener("dragstart", function(event) {
        // Metto l'immagine di Soul in una variabile
        Soul = event.target;
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

    document.addEventListener("dragover", function(event) {
        event.preventDefault()

    }, false);

    document.addEventListener("drop", function(event) {

        // Inserisco l'immagine di Soul nella casella
        if (event.target.className == "casella") {
            event.target.style.background = "";
            Soul.parentNode.removeChild(Soul);
            event.target.appendChild(Soul);
            Soul.style.marginLeft = "0px"
            Soul.style.marginTop = "0px"
        }
    }, false);

    document.onkeyup = function(e) {
        var charCode = e.keyCode;
        if (charCode == 13) {
            var Posizione = document.getElementById("soul").parentNode.id
            switch (Posizione) {
                case "armadio":
                    alert("Sei davanti all'armadio")
                    break;
                case "computer":
                    alert("Sei davanti al computer")
                    break;
                case "lavagna":
                    alert("Sei davanti alla lavagna")
                    break;
                case "porta":
                    alert("Sei davanti alla porta")
                    break;
                case "cestini":
                    alert("SOUL:I cestini sono vuoti...")
                    break;
                case "partenza":
                    alert("SOUL:La mia vecchia classe...")
                    break;
                default:
                    alert("Non sei davanti a niente")
                    break;
            }
        }
    }

    return ( <
        div id = 'schermata' >
        <
        div class = "casella"
        id = "porta" > < /div> <
        div class = "casella"
        id = "lavagna" > < /div> <
        div class = "casella"
        id = "computer" > < /div> <
        div class = "casella"
        id = "armadio" > < /div> <
        div class = "casella"
        id = "cestini" > < /div> <
        div class = "casella"
        id = "partenza" >
        <
        img src = { soul }
        id = "soul"
        draggable / >
        <
        /div>

        <
        /div>

    )

}

export default Classe5C