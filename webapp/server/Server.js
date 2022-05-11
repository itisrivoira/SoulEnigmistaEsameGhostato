let express=require('express')
let app=express()
app.use(express.static('www'))
let bodyParser= require("body-parser")  //serve per leggere i dati in POST
let cors = require('cors')  //gestire i permessi di accesso
var mysql=require("mysql")  //accedere al server sql
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

//oggetto connessione per creare
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"Soul"
  });
  
  //connessione
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  

var dati=[] //array per inserimento dati

app.get('/',(req,res)=>{
    console.log("FUNZIONO")
})

//funziona richiamata con s(nel gioco)
app.post('/salva',(req,res)=>{

    dati=req.body
    con.query("SELECT * FROM Salvataggi WHERE id='"+req.body.utente+"'", function (err, result) {
        if (err) throw err;
        if (result.length>0) {
            con.query("UPDATE Salvataggi SET Posizione ='"+req.body.posizione+"', Classe ='"+req.body.classe+"', acl ='"+req.body.acl+"' WHERE id='"+req.body.utente+"' ", function (err, result) {
                if (err) throw err;
              });   //aggiorna gli elementi nel salvataggio su sql

            con.query("DELETE FROM Zaino"+req.body.utente, function (err, result) {
            if (err) throw err; //cancella lo zaino
        
            });
            
            req.body.zaino.map((obj)=>{ //scorro l'array zaino e inserisco ogni elemento nello zaino
                console.log("INSERT INTO Zaino"+req.body.utente+" VALUES('"+obj.id+"')")
                con.query("INSERT INTO Zaino"+req.body.utente+" VALUES('"+obj.id+"')", function (err, result) {
                    if (err) throw err;
                    }); //ricrea lo zaino
            })
              
        }else{
            console.log("dati salvati:")
            console.log(dati)
            con.query("INSERT INTO Salvataggi(id,Posizione,Classe,acl) VALUES('"+req.body.utente+"','"+req.body.posizione+"','"+req.body.classe+",'"+req.body.acl+"')", function (err, result) {
                if (err) throw err;
              });
              con.query("CREATE TABLE IF NOT EXISTS Zaino"+req.body.utente+"(id varchar(20) NOT NULL PRIMARY KEY)", function (err, result) {
                if (err) throw err;
              });
              req.body.zaino.map((obj)=>{
                
                con.query("INSERT INTO Zaino"+req.body.utente+" VALUES('"+obj.id+"')", function (err, result) {
                    if (err) throw err;
                    console.log("Salvataggio Zaino funziona");
                  });
              })
        }
      });
    
      
      
    console.log(dati)

    
})

app.post('/caricaPartita',(req,res)=>{
    var dati={
        acl:0,
        posizione:"",
        classe:"",
        zaino:[]
    }
    con.query("SELECT * FROM Salvataggi WHERE id='"+req.body.utente+"'", function (err, result) {
        if (err) throw err;
        con.query("SELECT * FROM Zaino"+req.body.utente+"", function (err, ris) {
            if (err) throw err;     //recupero dei dati della partita salvata
            
            ris.map((obj)=>{
                dati.zaino.push({id:obj.id})
            })
            console.log(dati.zaino)
            dati.posizione=result[0].Posizione
            dati.classe=result[0].Classe
            dati.acl=result[0].acl
            res.send(JSON.stringify(dati))  //send invia i dati al client in json
            console.log("dati inviati:")
            console.log(dati)
        })  //creo l'oggetto con le informazioni della partita salvata
        
        
        
        
    })
    
})

app.post('/login',(req,res)=>{
    console.log("nick:"+req.body.nick)
    console.log("password:"+req.body.password)
    console.log("SELECT * FROM Utenti WHERE nickname='"+req.body.nick+"' AND password='"+req.body.password+"'")
    con.query("SELECT * FROM Utenti WHERE nickname='"+req.body.nick+"' AND password='"+req.body.password+"'", function (err, result) {
        if (err) throw err;
        if (result.length>0) {
            res.send(JSON.stringify({response:result})) //risultato id nick e password
        }else{
            res.send(JSON.stringify({response:false}))  //altrimenti false
        }
      });
})

let server = app.listen(3001,()=>{
    console.log("SERVER IN ESECUZIONE SULLA PORTA 3001")
})