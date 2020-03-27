<?php
    header("Access-Control-Allow-Origin: *");

    include_once '../config/Database.php';
    include_once '../models/Utente_Anagrafica.php';
    session_start();
    if (!isset($_SESSION['id']))
    {
        echo 0;
        return;
    }
    $database = new Database();
    $db = $database->openConnection();
    $user = new UtenteAnagrafica($db);
    if (strcmp($_SERVER['REQUEST_URI'], "/RestService/Utente-Anagrafica/read.php/user") == 0)
    {
        $user = $user->readById($_SESSION['id']);
        echo json_encode($user);
        return;
    }
    if (strcmp($_SESSION['ruolo'], "Admin") == 0){
        $users = array();
        $users = $user->read();
        if (count($users) > 0)
        {
            echo json_encode($users);
        }
    }
    else
        echo 0;
    $db = null;
?>