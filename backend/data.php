<?php
    include_once 'db.php';
    session_start();
    if (isset($_SESSION['id'])){
        $database = new Connection();
        $db = $database->openConnection();
        $users = getData($db);
        echo json_encode($users);
        $database->closeConnection();
        return;
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

    function checkCookie($cookie, $filename){
        $myarray=file($filename);
        for ($i = 0; $i < count($myarray); $i++)
        {
            $presentUser = json_decode($myarray[$i]);
            if (strcmp($presentUser->email, $cookie) == 0)
            {
                $_SESSION['user_mail'] = $presentUser->email;
                return true;
            }
        }
        return false;
    }
        
?>