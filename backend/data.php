<?php
    session_start();
    if (isset($_SESSION['user_mail'])){
        $users = getData("users.txt");
        echo json_encode($users);
        return;
    }
    if (!isset($_COOKIE["user"]))
    {
        echo 0;
        return;
    }
    else
    {
        $content = base64_decode ($_COOKIE["user"]);
        if (checkCookie($content, "users.txt"))
        {
            $users = getData("users.txt");
            echo json_encode($users);
            return;
        }
        echo 0;
        return;
    }

    function getData($filename){
        $myarray=file($filename);
        $users = array();
        for ($i = 0; $i < count($myarray); $i++)
        {
            $presentUser = json_decode($myarray[$i]);
            $users[$i] = $presentUser;
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

    //Vulnerabilità nella funzione di oscurazione dei cookie Da rivedere
        
?>