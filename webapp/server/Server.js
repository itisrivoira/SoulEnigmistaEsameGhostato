let express=require('express')
let app=express()
app.use(express.static('www'))
let bodyParser= require("body-parser")
let cors = require('cors')
var mysql=require("mysql")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

var dati=[]

app.get('/',(req,res)=>{
    res.end("Sono collegato")
    console.log("Esisto")
})


app.post('/salva',(req,res)=>{
    dati=req.body
    console.log(dati)

    
})

app.get('/caricaPartita',(req,res)=>{
    res.send(JSON.stringify(dati))
    console.log(dati)
})


let server = app.listen(3001,()=>{
    console.log("SERVER IN ESECUZIONE SULLA PORTA 3001")
})