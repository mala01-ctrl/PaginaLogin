<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../models/Utente_Anagrafica.php';
    include_once '../config/Database.php';

    session_start();
    $database = new Database();
    $db = $database->openConnection();
    $user = new UtenteAnagrafica($db);
    $data = json_decode(file_get_contents("php://input"));
    createUser($data, $user);
    if ($user->update())
        echo json_encode(array("risposta" => "Utente aggiornato"));
    else
        echo json_encode(array("risposta" => "Impossibile aggiornare l'utente"));
    $db = null;

    function createUser($data, $user){
        $user->id = $_SESSION['id'];
        $user->nome = $data->nome;
        $user->cognome = $data->cognome;
        $user->nazionalita = $data->nazionalita;
        $user->sesso = $data->sesso;
        $user->ruolo = $data->ruolo;
        $user->patente_A = $data->patente_A;
        $user->patente_B = $data->patente_B;
    }
?>