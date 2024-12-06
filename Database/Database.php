<?php

namespace ORB\Real_Estate\Database;

use Exception;

use wpdb;
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
    private PDO $pdo;
    public wpdb $connection;

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

        $this->pdo = new PDO($this->dsn, $this->db_user, $this->db_password);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (!isset($_ENV['DB_TYPE']) || $_ENV['DB_TYPE'] == null) {
            $this->connection = new wpdb($this->db_user, $this->db_password, $this->db_name, $this->db_host);
        } else {
            $this->connection = new DatabaseCustom($this->db_user, $this->db_password, $this->db_name, $this->db_host);
        }
    }

    function exists()
    {
        try {
            $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :db_name";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
            $stmt->execute();

            $db_check = $stmt->fetch();

            if ($db_check) {
                error_log("Database exists.");
            } else {
                error_log("Database does not exist.");
            }
        } catch (PDOException $e) {
            error_log("Error creating table: " . $e->getMessage());
            add_action('admin_notices', function () {
                echo '<div class="notice notice-error"><p>Error creating table. Check the logs for details.</p></div>';
            });
        } catch (Exception $e) {
            error_log("Error: " . $e->getMessage());
        }
    }

    function getSQLFilenames(string $directory): array
    {
        $sqlFiles = [];

        if (!file_exists($directory)) {
            throw new Exception("Directory does not exists.");
        }

        $files = scandir($directory);

        if (count($files) == 0) {
            throw new Exception("No files in this directory: $directory");
        }

        foreach ($files as $file) {
            $file_info = pathinfo($file);

            if (isset($file_info['extension']) && strtolower($file_info['extension']) === 'sql') {
                $sqlFiles[] = $file_info;
            }
        }

        return $sqlFiles;
    }

    function camelToSnake($input)
    {
        $output = preg_replace('/([a-z])([A-Z])/', '$1_$2', $input);
        return strtolower($output);
    }

    function execute(string $file)
    {
        try {

            if (!file_exists($file)) {
                throw new Exception("Directory does not exists.");
            }

            $sql = file_get_contents($file);

            if ($sql === false) {
                throw new Exception("Error reading SQL file.");
            }

            $this->pdo->exec($sql);

            add_action('admin_notices', function () {
                echo '<div class="notice notice-success"><p>Table created successfully.</p></div>';
            });
        } catch (PDOException $e) {
            error_log("Error creating table: " . $e->getMessage());
            add_action('admin_notices', function () {
                echo '<div class="notice notice-error"><p>Error creating table. Check the logs for details.</p></div>';
            });
        } catch (Exception $e) {
            error_log("Error: " . $e->getMessage());
        }
    }

    function tablesExists()
    {
        try {
            $dir = $this->directory . '/Tables';
            $tables = $this->getSQLFilenames($dir);

            foreach ($tables as $table) {
                $table_name = $this->camelToSnake($table['filename']);
                $query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = :db_name AND TABLE_NAME = :table_name";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
                $stmt->bindParam(':table_name', $table_name, PDO::PARAM_STR);
                $stmt->execute();

                $table_check = $stmt->fetch();

                if ($table_check) {
                    error_log("Table exists.\n");
                } else {
                    $file = $dir . '/' . $table['basename'];
                    $this->execute($file);
                }
            }
        } catch (PDOException $e) {
            error_log("Error creating table: " . $e->getMessage());
            add_action('admin_notices', function () {
                echo '<div class="notice notice-error"><p>Error creating table. Check the logs for details.</p></div>';
            });
        } catch (Exception $e) {
            error_log("Error: " . $e->getMessage());
        }
    }

    function viewsExists()
    {
        try {
            $dir = $this->directory . '/Views';
            $views = $this->getSQLFilenames($dir);

            if (count($views) == 0) {
                throw new Exception("No views to add in this directory.");
            }

            foreach ($views as $view) {
                $view_name = $this->camelToSnake($view['filename']);
                $query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = :db_name AND TABLE_NAME = :view_name";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
                $stmt->bindParam(':view_name', $view_name, PDO::PARAM_STR);
                $stmt->execute();

                $view_check = $stmt->fetch();

                if ($view_check) {
                    error_log("View exists.\n");
                } else {
                    $file = $dir . '/' . $view['basename'];
                    $this->execute($file);
                }
            }
        } catch (PDOException $e) {
            error_log("Error creating table: " . $e->getMessage());
            add_action('admin_notices', function () {
                echo '<div class="notice notice-error"><p>Error creating table. Check the logs for details.</p></div>';
            });
        } catch (Exception $e) {
            error_log("Error: " . $e->getMessage());
        }
    }

    function proceduresExists()
    {
        try {
            $dir = $this->directory . '/Procedures';
            $procedures = $this->getSQLFilenames($dir);

            if (count($procedures) == 0) {
                throw new Exception("No procedures to add in this directory.");
            }

            foreach ($procedures as $procedure) {
                $procedure_name = lcfirst($procedure['filename']);
                $query = "SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = :db_name AND ROUTINE_NAME = :procedure_name AND ROUTINE_TYPE = 'PROCEDURE'";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindParam(':db_name', $this->db_name, PDO::PARAM_STR);
                $stmt->bindParam(':procedure_name', $procedure_name, PDO::PARAM_STR);
                $stmt->execute();

                $procedure_check = $stmt->fetch();

                if ($procedure_check) {
                    error_log("Procedure exists.\n");
                } else {
                    $file = $dir . '/' . $procedure['basename'];
                    $this->execute($file);
                }
            }
        } catch (PDOException $e) {
            error_log("Error creating table: " . $e->getMessage());
            add_action('admin_notices', function () {
                echo '<div class="notice notice-error"><p>Error creating table. Check the logs for details.</p></div>';
            });
        } catch (Exception $e) {
            error_log("Error: " . $e->getMessage());
        }
    }

    function setup()
    {
        $this->exists();
        $this->tablesExists();
        $this->viewsExists();
        $this->proceduresExists();
    }
}
