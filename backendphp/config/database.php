<?php

class Database
{
    private $db;
    
    public function __construct(){
        try {
            $dbName = DB_NAME;
            $dbUserName = DB_USERNAME;
            $dbPassword = DB_PASSWORD;

            // create the db connection
            $this->db = new PDO("mysql:host=localhost;dbname={$dbName};charset=utf8mb4", $dbUserName, $dbPassword);
            // Set PDO error mode to exception
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            // Handle connection error
            die("Database connection failed: " . $e->getMessage());
        }
    }


    // return connection status
    public function dbconn(){
        return $this->db;
    }
}
