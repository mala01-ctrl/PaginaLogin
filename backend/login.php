<?php
    session_start();
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
                $_SESSION['user_mail'] = $presentUser->email;
                setcookie("user", encryptCookie($presentUser), time() + 72000, '/');  //72000 equivale a 2 giorni
                return true;
            }
        }
        return false;
    }

    function encryptCookie($presentUser){
        //$salt = substr (md5($presentUser->email), 0, 2);
        $cookie = base64_encode ($presentUser->email);
        return $cookie;
    }
?>