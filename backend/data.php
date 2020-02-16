<?php
    if (!isset($_COOKIE["user"]))
    {
        echo 0;
        return;
    }
    else
    {
        $users = getData("users.txt");
        echo json_encode($users);
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
        
?>