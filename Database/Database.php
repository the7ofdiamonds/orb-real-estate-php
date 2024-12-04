<?php

namespace ORB\Real_Estate\Database;

use wpdb;

class Database
{
    private string $db_name;
    private string $db_host;
    private string $db_user;
    private string $db_password;

    public wpdb $connection;

    public function __construct()
    {
        global $wpdb;
        $this->db_name = isset($_ENV['DB_NAME']) ? $_ENV['DB_NAME'] : 'orb';
        $this->db_host = isset($_ENV['DB_HOST']) ? $_ENV['DB_HOST'] : $wpdb->dbhost;
        $this->db_user = isset($_ENV['DB_USER']) ? $_ENV['DB_USER'] : $wpdb->dbuser;
        $this->db_password = isset($_ENV['DB_PASSWORD']) ? $_ENV['DB_PASSWORD'] : $wpdb->dbpassword;

        if (!isset($_ENV['DB_TYPE']) || $_ENV['DB_TYPE'] == null) {
            $this->connection = new wpdb($this->db_user, $this->db_password, $this->db_name, $this->db_host);
        } else {
            $this->connection = new DatabaseCustom($this->db_user, $this->db_password, $this->db_name, $this->db_host);
        }
    }

    public function establishConnection()
    {
        // if ($this->db_type == 'mysql') {
        //     $this->createMySQLDatabase();
        // } elseif ($this->db_type == 'pgsql') {
        //     $this->createPostgreSQLDatabase();
        // }
    }

    function createTables()
    {
        // $this->create_options_table();
        // $this->create_user_meta_table();

        // No tables to create here just need connection
        error_log("Create tables ???");
    }
}
