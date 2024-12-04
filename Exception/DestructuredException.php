<?php

namespace ORB\Real_Estate\Exception;

use SEVEN_TECH\Communications\Exception\DestructuredException as CommunicationsException;

use Exception;
use WP_Error;
use TypeError;

use Kreait\Firebase\Auth\SignIn\FailedToSignIn;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\FirebaseException;

class DestructuredException extends Exception
{
    private $exception;

    public function __construct(Exception | WP_Error | TypeError | CommunicationsException | AuthException | FailedToSignIn | FirebaseException $e)
    {
        $this->exception = $e;
    }

    function getErrorMessage()
    {

        if ($this->exception instanceof DestructuredException) {
            return $this->exception->getErrorMessage();
        }

        if ($this->exception instanceof CommunicationsException) {
            return $this->exception->getErrorMessage();
        }

        return $this->exception->getMessage();
    }

    function getStatusCode()
    {
        
        if ($this->exception instanceof DestructuredException) {
            return $this->exception->getStatusCode();
        }

        if ($this->exception instanceof CommunicationsException) {
            return $this->exception->getStatusCode();
        }

        return $this->exception->getCode();
    }

    public function rest_ensure_response_error()
    {
        $statusCode = $this->getStatusCode();
        $response_data = [
            'error_message' => $this->getErrorMessage(),
            'status_code' => $statusCode
        ];
        $response = rest_ensure_response($response_data);
        $response->set_status($statusCode);

        return $response;
    }
}
