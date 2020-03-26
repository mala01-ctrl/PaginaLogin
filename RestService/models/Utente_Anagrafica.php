<?php
    class UtenteAnagrafica{
        public $id;
        public $nome;
        public $cognome;
        public $nazionalita;
        public $email;
        public $sesso;
        public $ruolo;
        public $patente_A;
        public $patente_B;
        public $password;
        public $id_utente_login;
        public $conn;

        public function __construct($c)
        {
            $this->conn = $c;
        }

        function read(){
            $sql = "SELECT * FROM anagrafici_utente";
            $stmt = $this->conn->query($sql);
            $users = array();
            while ($user = $stmt->fetchObject()) {
                $users[] = $user;
            }
            return $users;
        }

        function create(){
            $sql = "INSERT INTO anagrafici_utente(nome, cognome, nazionalita, sesso, ruolo,
            patente_A, patente_B, email)
            VALUES (:nome, :cognome, :nazionalita, :sesso, :ruolo, :patente_A, :patente_B, :email)";
            
            $stmt = $this->conn->prepare($sql);
            
            $anagrafe = $stmt->execute(array(':nome' => $this->nome, ':cognome' => $this->cognome, 
                ':sesso' => $this->sesso, ':nazionalita' => $this->nazionalita, 
                ':email' => $this->email, ':ruolo' => $this->ruolo, ':patente_A' => $this->patente_A, 
                ':patente_B' => $this->patente_B));
            $this->id = $this->conn->lastInsertId();
            $sql = "INSERT INTO login_utente(password_user, utente) 
                VALUES (:password, :utente)";
            $stmt = $this->conn->prepare($sql);
            $login = $stmt->execute(array(':password' => password_hash($this->password, PASSWORD_DEFAULT), 
                ':utente' => $this->id));
            if ($login == true && $anagrafe == true)
                return true;
            return false;
        }

        function update(){
            $sql = "UPDATE anagrafici_utente
                SET nome = :nome, cognome = :cognome, nazionalita = :nazionalita, 
                sesso = :sesso, ruolo = :ruolo, patente_A = :patente_A, 
                patente_B= :patente_B
                WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $anagrafe = $stmt->execute(array(':nome' => $this->nome, ':cognome' => $this->cognome, 
            ':sesso' => $this->sesso, ':nazionalita' => $this->nazionalita, 
             ':ruolo' => $this->ruolo, ':patente_A' => $this->patente_A, 
             ':patente_B' => $this->patente_B, ':id' => $this->id));
            return $anagrafe;
        }

        function delete(){
            $sql = "DELETE FROM anagrafici_utente WHERE id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(1, $this->id);
            $anagrafe =  $stmt->execute();

            $sql = "DELETE FROM login_utente WHERE utente = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(1, $this->id);
            $esito =  $stmt->execute();
            if ($esito && $anagrafe)
                return true;
            return false;
        }

        function readById($id){
            $stmt = $this->conn->prepare("SELECT * FROM anagrafici_utente
            WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $user = $stmt->fetchObject();
            return $user;
        }
    }
?>