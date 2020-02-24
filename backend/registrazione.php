<?php
    include_once 'db.php';

    $requestPayload = file_get_contents("php://input");
    $user = json_decode($requestPayload);
    if (!checkValue($user)){
        echo 0;
        return;
    }
    try
    {
        $database = new Connection();
        $db = $database->openConnection();
        insertUser($db, $user);
        $id = selectUser($db, $user);
        insertLogin($db, $user, $id);
        $database->closeConnection();
        echo 1;
        return;
        
    }catch(PDOException $e)
    {
        echo 0;
    }

    function checkValue($user){
        if (strcmp($user->nome, "") == 0)
            return false;
        if (strcmp($user->cognome, "") == 0)
            return false;
        if (strcmp($user->sesso, "") == 0)
            return false;
        if (strcmp($user->nazionalita, "") == 0)
            return false;
        if (strcmp($user->patente, "") == 0)
            return false;
        if (strcmp($user->email, "") == 0)
            return false;
        if (strcmp($user->password, "") == 0)
            return false;
        return true;
    }

    function insertUser($db, $user){
        $stm = $db->prepare("INSERT INTO anagrafici_utente (nome, cognome ,sesso, patente, nazionalita, email) 
        VALUES (:nome, :cognome, :sesso, :patente, :nazionalita, :email)");
        $stm->execute(array(':nome' => $user->nome, ':cognome' => $user->cognome, 
        ':sesso' => $user->sesso, ':patente' => $user->patente, 
        ':nazionalita' => $user->nazionalita, ':email' => $user->email));
    }

    function selectUser($db){
        return $db->lastInsertId();
    }

    function insertLogin($db, $user, $id){
        $stm = $db->prepare("INSERT INTO login_utente (password_user, utente) 
        VALUES (:password_user, :utente)");
        $stm->execute(array(':password_user' => password_hash($user->password, PASSWORD_DEFAULT), ':utente' => $id));
    }
?>