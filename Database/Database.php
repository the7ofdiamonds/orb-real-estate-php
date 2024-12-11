<?php

namespace ORB\Real_Estate\Database;

use ORB\Real_Estate\Exception\DestructuredException;

use Exception;

use PDO;
use PDOException;

class Database
{
    public string $directory;
    private string $db_name;
    private string $db_host;
    private string $db_user;
    private string $db_password;
    private string $db_type;
    private string $db_charset;
    private string $db_collate;
    private string $charset_collate;
    private string $primary_key_config;
    private string $updated_at = '';
    private string $standard_conforming_strings;
    private string $encoding = 'UTF8';
    private string $dsn;
    public PDO $connection;

    public function __construct()
    {
        $this->directory = ORB_REAL_ESTATE . 'Database';

        global $wpdb;
        $this->db_name = isset($_ENV['DB_NAME']) ? $_ENV['DB_NAME'] : 'orb';
        $this->db_host = isset($_ENV['DB_HOST']) ? $_ENV['DB_HOST'] : $wpdb->dbhost;
        $this->db_user = isset($_ENV['DB_USER']) ? $_ENV['DB_USER'] : $wpdb->dbuser;
        $this->db_password = isset($_ENV['DB_PASSWORD']) ? $_ENV['DB_PASSWORD'] : $wpdb->dbpassword;
        $this->db_type = isset($_ENV['DB_TYPE']) ? $_ENV['DB_TYPE'] : 'mysql';
        $this->db_charset = isset($_ENV['DB_CHARSET']) ? $_ENV['DB_CHARSET'] : $wpdb->charset;
        $this->db_collate = isset($_ENV['DB_COLLATE']) ? $_ENV['DB_COLLATE'] : $wpdb->collate;
        $this->charset_collate = isset($_ENV['DB_CHARSET_COLLATE']) ? $_ENV['DB_CHARSET_COLLATE'] : $wpdb->get_charset_collate();

        if ($this->db_type == 'mysql') {
            $this->dsn = "mysql:host=$this->db_host;dbname=$this->db_name";
            $this->primary_key_config = 'INT NOT NULL AUTO_INCREMENT';
            $this->updated_at = ' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
        }

        if ($this->db_type == 'pgsql') {
            $this->dsn = "pgsql:host=$this->db_host;";
            $this->primary_key_config = 'SERIAL';
            $this->standard_conforming_strings = 'ON';
        }
    }

    function getConnection()
    {
        try {
            $connection = new PDO($this->dsn, $this->db_user, $this->db_password);
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $connection;
        } catch (PDOException $e) {
            throw new DestructuredException($e);
        }
    }

    function exists(): bool
    {
        try {
            $dsn = "mysql:host=$this->db_host;";
            $pdo = new PDO($dsn, $this->db_user, $this->db_password);
            $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :db_name";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->fetch()) {
                error_log("Database {$this->db_name} exists.\n");
                return true;
            } else {
                $createDatabaseQuery = "CREATE DATABASE `$this->db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;";

                if ($pdo->exec($createDatabaseQuery) !== false) {
                    return true;
                }
            }

            return false;
        } catch (PDOException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function getSQLFilenames(string $directory): array
    {
        try {
            $sqlFiles = [];

            if (!file_exists($directory)) {
                throw new Exception("Directory does not exists.");
            }

            $files = scandir($directory);

            if (count($files) == 0) {
                error_log("No files in this directory: $directory\n");
                return $sqlFiles;
            }

            foreach ($files as $file) {
                $file_info = pathinfo($file);

                if (isset($file_info['extension']) && strtolower($file_info['extension']) === 'sql') {
                    $sqlFiles[] = $file_info;
                }
            }

            return $sqlFiles;
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function camelToSnake(string $input): string
    {
        $output = preg_replace('/([a-z])([A-Z])/', '$1_$2', $input);

        return strtolower($output);
    }

    function execute(string $file): bool
    {
        try {

            if (!file_exists($file)) {
                throw new Exception("Directory does not exists.");
            }

            $sql = file_get_contents($file);

            if ($sql === false) {
                throw new Exception("Error reading SQL file.");
            }

            $pdo = new PDO($this->dsn, $this->db_user, $this->db_password);
            $executed = $pdo->exec($sql);

            if ($executed === false) {
                throw new Exception("There was an error executing SQL command.");
            }

            return true;
        } catch (PDOException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function tablesExists(): bool
    {
        try {
            $dir = $this->directory . '/Tables';
            $tables = $this->getSQLFilenames($dir);

            if (count($tables) == 0) {
                error_log("No tables to add in this directory.\n");
                return true;
            }

            $pdo = new PDO($this->dsn, $this->db_user, $this->db_password);

            foreach ($tables as $table) {
                $table_name = $this->camelToSnake($table['filename']);
                $query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = :db_name AND TABLE_NAME = :table_name";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
                $stmt->bindParam(':table_name', $table_name, PDO::PARAM_STR);
                $stmt->execute();

                if ($stmt->fetch()) {
                    error_log("Table {$table_name} exists.\n");
                } else {
                    $file = $dir . '/' . $table['basename'];
                    $this->execute($file);
                }
            }

            return true;
        } catch (PDOException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        }
    }

    function viewsExists(): bool
    {
        try {
            $dir = $this->directory . '/Views';
            $views = $this->getSQLFilenames($dir);

            if (count($views) == 0) {
                error_log("No views to add in this directory.\n");
                return true;
            }

            $pdo = new PDO($this->dsn, $this->db_user, $this->db_password);

            foreach ($views as $view) {
                $view_name = $this->camelToSnake($view['filename']);
                $query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = :db_name AND TABLE_NAME = :view_name";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
                $stmt->bindParam(':view_name', $view_name, PDO::PARAM_STR);
                $stmt->execute();

                if ($stmt->fetch()) {
                    error_log("View {$view_name} exists.\n");
                } else {
                    $file = $dir . '/' . $view['basename'];
                    $this->execute($file);
                }
            }

            return true;
        } catch (PDOException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        }
    }

    function proceduresExists(): bool
    {
        try {
            $dir = $this->directory . '/Procedures';
            $procedures = $this->getSQLFilenames($dir);

            if (count($procedures) == 0) {
                error_log("No procedures to add in this directory.\n");
                return true;
            }

            $pdo = new PDO($this->dsn, $this->db_user, $this->db_password);

            foreach ($procedures as $procedure) {
                $procedure_name = lcfirst($procedure['filename']);
                $query = "SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = :db_name AND ROUTINE_NAME = :procedure_name AND ROUTINE_TYPE = 'PROCEDURE'";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
                $stmt->bindParam(':procedure_name', $procedure_name, PDO::PARAM_STR);
                $stmt->execute();

                if ($stmt->fetch()) {
                    error_log("Procedure {$procedure_name} exists.\n");
                } else {
                    $file = $dir . '/' . $procedure['basename'];
                    $this->execute($file);
                }
            }

            return true;
        } catch (PDOException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        }
    }

    function setup(): bool
    {
        try {
            $databaseExists = $this->exists();

            if ($databaseExists) {
                $tablesExists = $this->tablesExists();

                if ($tablesExists) {
                    $viewsExists = $this->viewsExists();
                }

                if ($viewsExists) {
                    $proceduresExists = $this->proceduresExists();

                    if ($proceduresExists) {
                        return true;
                    }
                }
            }

            return false;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        }
    }
}
