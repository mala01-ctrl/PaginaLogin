<?php
    $requestPayload = file_get_contents("php://input");
    $user = json_decode($requestPayload);
    if (!checkValue($user)){
        echo 0;
        return;
    }
    $myfile = "users.txt";
    if (filesize($myfile) > 0)
    {
        if (UserExist($user, $myfile)){
            echo 0;
            return;
        }
    }
    $MyFileHandler = fopen($myfile, 'a+');
    $row = createRow($user);
    fwrite($MyFileHandler, $row);
    fwrite($MyFileHandler, "\n");
    fclose($MyFileHandler);
    echo 1;

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

    function UserExist($user, $filename){
        $myarray=file($filename);
        for ($i = 0; $i < count($myarray); $i++)
        {
            $presentUser = json_decode($myarray[$i]);
            if (strcmp($presentUser->email, $user->email) == 0)
                return true;
        }
        return false;
    }

    function createRow($user){
        $user->password = password_hash($user->password, PASSWORD_DEFAULT);
        $row = json_encode($user);
        return $row; 
    }

?>