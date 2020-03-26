<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: DELETE");

    include_once '../models/Utente_Anagrafica.php';
    include_once '../config/Database.php';

    $database = new Database();
    $db = $database->openConnection();
    $user = new UtenteAnagrafica($db);
    $data = json_decode(file_get_contents("php://input"));
    $user->id = $data->id;
    if ($user->delete())
        echo json_encode(array("message" => "Utente cancellato correttamente."));
    else
        echo json_encode(array("message" => "Utente non cancellato."));
    $db = null;
?>