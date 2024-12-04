<?php

namespace ORB\Real_Estate\ENV;

use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Upload\Upload;

use Exception;

class ENV
{
    public $upload_path;
    public $upload_url;

    public function __construct()
    {
        $this->upload_path = ORB_REAL_ESTATE;
        $this->upload_url = ORB_REAL_ESTATE_URL;
    }

    function uploadENVFile($file)
    {
        try {
            $file['name'] = '.ENV';
            error_log(print_r($file, true));
            (new Upload)->uploadFile($file, $this->upload_path, $this->upload_url);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        }
    }

    function valid(string $envFilePath, array $requiredFields): bool
    {
        try {

            if (file_exists($envFilePath)) {
                $envContents = file_get_contents($envFilePath);
                $lines = explode("\n", $envContents);

                $foundFields = array_fill_keys($requiredFields, false);

                foreach ($lines as $line) {
                    if (trim($line) === '' || str_starts_with(trim($line), '#')) {
                        continue;
                    }

                    $parts = explode('=', $line, 2);
                    if (count($parts) === 2) {
                        $key = trim($parts[0]);
                        $value = trim($parts[1]);

                        if (isset($foundFields[$key]) && $value !== '') {
                            $foundFields[$key] = true;
                        }
                    }
                }

                return !in_array(false, $foundFields, true);
            }

            return false;
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }
}
