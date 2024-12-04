<?php

namespace ORB\Real_Estate\Database;

use Exception;
use InvalidArgumentException;

use wpdb;
use PDO;
use PDOException;

class DatabaseCustom extends wpdb
{
    private string $db_type;
    private string $db_charset;
    private string $db_collate;
    private string $charset_collate;
    private string $primary_key_config;
    private string $updated_at = '';
    private string $standard_conforming_strings;
    private string $encoding = 'UTF8';
    private string $dsn;
    private PDO $pdo;

    public function __construct(string $dbuser, string $dbpassword, string $dbname, string $dbhost)
    {
        try {
            parent::__construct($dbuser, $dbpassword, $dbname, $dbhost);

            global $wpdb;
            $this->db_type = isset($_ENV['DB_TYPE']) ? $_ENV['DB_TYPE'] : 'mysql';
            $this->db_charset = isset($_ENV['DB_CHARSET']) ? $_ENV['DB_CHARSET'] : $wpdb->charset;
            $this->db_collate = isset($_ENV['DB_COLLATE']) ? $_ENV['DB_COLLATE'] : $wpdb->collate;
            $this->charset_collate = isset($_ENV['DB_CHARSET_COLLATE']) ? $_ENV['DB_CHARSET_COLLATE'] : $wpdb->get_charset_collate();

            if ($this->db_type == 'mysql') {
                $this->dsn = "mysql:host=$this->db_host;charset=$this->db_charset";
                $this->primary_key_config = 'INT NOT NULL AUTO_INCREMENT';
                $this->updated_at = ' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
            }

            if ($this->db_type == 'pgsql') {
                $this->dsn = "pgsql:host=$this->db_host;";
                $this->primary_key_config = 'SERIAL';
                $this->standard_conforming_strings = 'ON';
            }

            $this->pdo = new PDO($this->dsn, $this->db_user, $this->db_password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            error_log("Connection failed: " . $e->getMessage());
            // $this->establishConnection();
        }
    }

    public function query($query)
    {
        try {
            $stmt = $this->pdo->query($query);

            if (stripos(trim($query), 'SELECT') === 0) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

            return $stmt->rowCount();
        } catch (PDOException $e) {
            throw new Exception("Database query failed: " . $e->getMessage());
        }
    }

    public function get_results($query = null, $output = OBJECT)
    {
        if (!$query) {
            return null;
        }
    
        try {
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();
    
            switch ($output) {
                case OBJECT:
                    return $stmt->fetchAll(PDO::FETCH_OBJ);
                case ARRAY_A:
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                case ARRAY_N:
                    return $stmt->fetchAll(PDO::FETCH_NUM);
                default:
                    throw new InvalidArgumentException("Invalid output type: $output");
            }
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            return null;
        }
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

    private function createMySQLDatabase()
    {
        try {
            $dsn = "mysql:host=$this->db_host;";
            $connection = new PDO($dsn, $this->db_user, $this->db_password);
            $checkDatabaseExists = $connection->prepare("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbname");
            $checkDatabaseExists->execute([':dbname' => $this->db_name]);

            if (empty($checkDatabaseExists->rowCount())) {
                $connection->exec("CREATE DATABASE IF NOT EXISTS {$this->db_name} CHARACTER SET {$this->db_charset} COLLATE {$this->db_collate}");
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

    function createTables()
    {
        // $this->create_options_table();
        // $this->create_user_meta_table();

        // No tables to create here just need connection
        error_log("Create tables ???");
    }
}
