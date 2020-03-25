<?php
    include_once 'db.php';
    session_start();
    if (isset($_SESSION['id']))
    {
        echo $_SESSION['ruolo'];
        return;
    }
    $email;
    $password;
    if (isset($_POST['email']))
        $email = $_POST['email'];
    if (isset($_POST['password']))
        $password = $_POST['password'];
    try
    {
        $database = new Connection();
        $db = $database->openConnection();
        $user = login($email, $password, $db);
        if ($user != null)
            echo ($user);
        else
            echo 0;
        
    }catch(PDOException $e)
    {
        echo 0;
    }


    function login($email, $password, $db){
        $stm = $db->prepare("SELECT u.email, l.password_user, u.ruolo, u.id 
        FROM anagrafici_utente u
        INNER JOIN login_utente l on l.utente = u.id
        WHERE u.email = :email");
        $stm->execute(['email' => $email]);
        $user = $stm->fetch(); 
        if (!Empty($user))
        {
            if (password_verify($password, $user['password_user']))
            {
                $_SESSION['id'] = $user['id'];
                $_SESSION['ruolo'] = $user['ruolo'];
                return $user['ruolo'];
            }  
        }
        return null;
    }
?>