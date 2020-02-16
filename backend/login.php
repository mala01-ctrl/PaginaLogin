<?php
    $email;
    $password;
    if (isset($_POST['email']))
        $email = $_POST['email'];
    if (isset($_POST['password']))
        $password = $_POST['password'];
    $myfile = "users.txt";
    if (login($email, $password, $myfile))
        echo 1;
    else
        echo 0;

    function login($email, $password, $filename){
        $myarray=file($filename);
        for ($i = 0; $i < count($myarray); $i++)
        {
            $presentUser = json_decode($myarray[$i]);
            if (strcmp($presentUser->email, $email) == 0 && password_verify($password, $presentUser->password))
            {
                setcookie("user", $presentUser->email, time() + 72000, '/');  //72000 equivale a 2 giorni
                return true;
            }
        }
        return false;
    }
?>