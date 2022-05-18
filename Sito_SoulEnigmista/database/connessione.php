<?php

$host = "localhost";
$usename = "";
$password = "";
$database = "Soul";

$connessione = new mysqli ($host, $username, $password, $database);

if($connessione > connect_error()) {
    echo "Non riesco a connetermi al database";
    exit();
} else {
    echo "Hai effettuato l'accesso!";
}

?>