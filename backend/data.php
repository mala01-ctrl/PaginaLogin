<?php
    include_once 'db.php';
    session_start();
    if (isset($_SESSION['user'])){
        $URI = $_SERVER['REQUEST_URI'];
        $database = new Connection();
        $db = $database->openConnection();
        if (strcmp($URI, "/backend/data.php/users") == 0)
        {
            if (strcmp($_SESSION['user']['ruolo'], "Admin") == 0)
            {
                $users = getData($db);
                echo json_encode($users);
                $database->closeConnection();
                return;
            }
        }
        if (strcmp($URI, "/backend/data.php/user") == 0)
        {
            $id = $_SESSION['user']['id'];
            $user = getUserFromId($db, $id);
            echo json_encode($user);
            $database->closeConnection();
            return;
        }
    }
    else
        echo 0;

    function getData($db){
        $sql = "SELECT * FROM anagrafici_utente";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $users = array();
        while ($row = $stmt->fetchObject()) {
            array_push($users, $row);
        }
        return $users;
    }

    function getUserFromId($db, $id){
        $stm = $db->prepare("SELECT * FROM anagrafici_utente
        WHERE id = :id");
        $stm->execute(['id' => $id]);
        $user = $stm->fetch();
        return $user;
    }
        
?>