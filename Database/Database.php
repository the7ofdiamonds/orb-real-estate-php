<?php

namespace ORB\Real_Estate\Database;

use PDO;
use PDOException;

class Database
{
    private $wpdb;
    private $db_type;
    private $db_host;
    protected $db_name;
    private $db_user;
    private $db_password;
    protected $connection;
    public $db_charset;
    public $db_collate;
    public $charset_collate;
    private $primary_key_config;
    private $updated_at;
    private $standard_conforming_strings;
    private $encoding;
    private $dsn;
    private $sql;

    public function __construct()
    {
        try {
            global $wpdb;
            $this->wpdb = $wpdb;

            $this->primary_key_config = 'INT NOT NULL AUTO_INCREMENT';
            $this->updated_at = ' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
            $this->db_charset = $wpdb->charset;
            $this->db_collate = $wpdb->collate;
            $this->charset_collate = $wpdb->get_charset_collate();
            $this->standard_conforming_strings = 'ON';
            $this->encoding = 'UTF8';

            if (!isset($_ENV['DB_TYPE']) || $_ENV['DB_TYPE'] == null || !isset($_ENV['DB_HOST']) ||  $_ENV['DB_HOST'] == null || !isset($_ENV['DB_USER']) || $_ENV['DB_USER'] == null || !isset($_ENV['DB_PASSWORD']) || $_ENV['DB_PASSWORD'] == null) {
                $this->db_type = 'mysql';
                $this->db_host = $wpdb->dbhost;
                $this->db_user = $wpdb->dbuser;
                $this->db_password = $wpdb->dbpassword;
                $this->db_name = get_option('DB_NAME', 'orb');

                $this->dsn = "mysql:host=$this->db_host;charset=$this->db_charset";
                $this->connection = new PDO($this->dsn, $this->db_user, $this->db_password);
            }

            if (isset($_ENV['DB_TYPE']) && $_ENV['DB_TYPE'] != null || isset($_ENV['DB_HOST']) &&  $_ENV['DB_HOST'] != null || isset($_ENV['DB_USER']) && $_ENV['DB_USER'] != null || isset($_ENV['DB_PASSWORD']) && $_ENV['DB_PASSWORD'] != null) {
                $this->db_type = $_ENV['DB_TYPE'];
                $this->db_host = $_ENV['DB_HOST'];
                $this->db_user = $_ENV['DB_USER'];
                $this->db_password = $_ENV['DB_PASSWORD'];
                $this->db_name = $_ENV['DB_NAME'] ?: 'orb';


                if ($this->db_type == 'mysql') {
                    $this->dsn = "mysql:host=$this->db_host;charset=$this->db_charset";
                    $this->connection = new PDO($this->dsn, $this->db_user, $this->db_password);
                }

                if ($this->db_type == 'pgsql') {
                    $this->dsn = "pgsql:host=$this->db_host;";
                    $this->connection = new PDO($this->dsn, $this->db_user, $this->db_password);
                    $this->primary_key_config = 'SERIAL';
                    $this->updated_at = '';
                    $this->charset_collate = '';
                }
            }

            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            error_log("Connection failed: " . $e->getMessage());
            $this->establishConnection();
        }
    }

    public function getDBName()
    {
        return $this->db_name;
    }

    public function  getConnection()
    {
        return $this->connection;
    }

    public function establishConnection()
    {
        if ($this->db_type == 'mysql') {
            $this->createMySQLDatabase();
        } elseif ($this->db_type == 'pgsql') {
            $this->createPostgreSQLDatabase();
        }
    }

    private function createMySQLDatabase()
    {
        try {
            $dsn = "mysql:host=$this->db_host;";
            $connection = new PDO($dsn, $this->db_user, $this->db_password);
            $checkDatabaseExists = $connection->prepare("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbname");
            $checkDatabaseExists->execute([':dbname' => $this->db_name]);

            if (empty($checkDatabaseExists->rowCount())) {
                $connection->exec("CREATE DATABASE IF NOT EXISTS {$this->db_name} CHARACTER SET {$this->wpdb->charset} COLLATE {$this->wpdb->collate}");
            }

            return $this->createTables();
        } catch (PDOException $e) {
            error_log("Connection failed: " . $e->getMessage());
        }
    }

    private function createPostgreSQLDatabase()
    {
        $dsn = "pgsql:host={$this->db_host};";
        $connection = new PDO($dsn, $this->db_user, $this->db_password);
        $checkDatabaseExists = $connection->prepare("SELECT datname FROM pg_database WHERE datname = :dbname");
        $checkDatabaseExists->execute([':dbname' => $this->db_name]);

        if (empty($checkDatabaseExists->rowCount())) {
            $connection->exec("CREATE DATABASE {$this->db_name}");
        }

        return $this->createTables();
    }

    function updatedAT($table_name)
    {
        if ($this->db_type === 'pgsql') {
            $setEncoding = "SET CLIENT_ENCODING TO {$this->encoding}";

            $this->connection->query($setEncoding);

            $standardConformingStrings = "SET STANDARD_CONFORMING_STRINGS TO {$this->standard_conforming_strings};";

            $this->connection->query($standardConformingStrings);

            $triggerSql = "
                CREATE OR REPLACE FUNCTION update_timestamp()
                RETURNS TRIGGER AS $$
                BEGIN
                    NEW.updated_at = CURRENT_TIMESTAMP;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
    
                DROP TRIGGER IF EXISTS update_timestamp ON {$table_name};
                CREATE TRIGGER update_timestamp
                BEFORE UPDATE ON {$table_name}
                FOR EACH ROW
                EXECUTE FUNCTION update_timestamp();
            ";

            $this->connection->exec($triggerSql);
        }
    }

    function createTables()
    {
        // $this->create_options_table();
        // $this->create_user_meta_table();

        // No tables to create here just need connection
        error_log("Create tables ???");
    }
}
