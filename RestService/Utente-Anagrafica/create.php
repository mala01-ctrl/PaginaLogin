<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../models/Utente_Anagrafica.php';
    include_once '../config/Database.php';

    $database = new Database();
    $db = $database->openConnection();
    $user = new UtenteAnagrafica($db);
    $data = json_decode(file_get_contents("php://input"));
    if (checkValuePassed($data)){
        createUser($data, $user);
        if ($user->create()){
            echo json_encode(array("message" => "Utente inserito correttamente."));
        }
        else
            echo json_encode(array("message" => "Impossibile inserire l'utente"));
    }
    else
    {
        //400 bad request
        http_response_code(400);
        echo json_encode(array("message" => "Impossibile inserire l'utente i dati sono incompleti."));
    }
    $db = null;
    

    function checkValuePassed($data){
        if (strcmp($data->nome, "") == 0)
            return false;
        if (strcmp($data->cognome, "") == 0)
            return false;
        if (strcmp($data->sesso, "") == 0)
            return false;
        if (strcmp($data->nazionalita, "") == 0)
            return false;
        if (strcmp($data->email, "") == 0)
            return false;
        if (strcmp($data->password, "") == 0)
            return false;
        if (strcmp($data->ruolo, "") == 0)
            return false;
        return true;
    }

    function createUser($data, $user){
        $user->nome = $data->nome;
        $user->cognome = $data->cognome;
        $user->nazionalita = $data->nazionalita;
        $user->sesso = $data->sesso;
        $user->ruolo = $data->ruolo;
        if ($data->patente_A)
            $user->patente_A = 1;
        if ($data->patente_B)
            $user->patente_B = 0;
        $user->email = $data->email;
        $user->password = $data->password;
    }
?>