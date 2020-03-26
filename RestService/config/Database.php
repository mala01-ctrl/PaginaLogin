<?php
    class Database{
        private $server = "mysql:host=localhost;dbname=quintaa_anagrafe";
        private $user = "root";
        private $password = "Lorimala01";
        public $conn;

        public function openConnection(){
            try
            {
                $this->con = new PDO($this->server, $this->user, $this->password);
                return $this->con;
            }catch(PDOException $e)
            {
                echo $e->getMessage();
            }
        }
    }
?>