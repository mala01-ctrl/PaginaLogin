<?php
    class User
    {
        public $nome;
        public $cognome;
        public $sesso;
        public $nazionalita;
        public $email;
        public $password;

        public function __construct($nome, $cognome, $sesso, $nazionalita, $email)
        {
            $this->nome = $nome;
            $this->cognome = $cognome;
            $this->sesso = $sesso;
            $this->nazionalita = $nazionalita;
            $this->email = $email;            
        }
    }
?>