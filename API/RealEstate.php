<?php

namespace ORB\Real_Estate\API;

use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Property\Property;

use Exception;
use TypeError;

use WP_REST_Request;
use WP_REST_Response;

class RealEstate
{
    private Property $propertyClass;

    public function __construct()
    {
        $this->propertyClass = new Property();
    }

    function add(WP_REST_Request $request)
    {
        try {

            $body = json_decode($request->get_body());
            $property = $this->propertyClass->create($body);

            $add = $this->propertyClass->add($property);

            if ($add) {
                $addResponse = [
                    "success_message" => "Real Estate Listing added.",
                ];
            }

            $response = new WP_REST_Response($addResponse);
            $response->set_status(200);

            return rest_ensure_response($response);
        } catch (TypeError $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        } catch (DestructuredException $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        } catch (Exception $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        }
    }

    function residential(WP_REST_Request $request)
    {
        try {
            $body = json_decode($request->get_body(), true);
            $requestProperties = $this->propertyClass->searchParams($body);
            $residentialResponse = $this->propertyClass->residential($requestProperties);
            $response = new WP_REST_Response($residentialResponse);
            $response->set_status(200);

            return rest_ensure_response($response);
        } catch (DestructuredException $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        } catch (Exception $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        }
    }

    function commercial(WP_REST_Request $request)
    {
        try {
            $body = json_decode($request->get_body(), true);
            $requestProperties = $this->propertyClass->searchParams($body);
            $commercialResponse = $this->propertyClass->commercial($requestProperties);
            $response = new WP_REST_Response($commercialResponse);
            $response->set_status(200);

            return rest_ensure_response($response);
        } catch (DestructuredException $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        } catch (Exception $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        }
    }

    function search(WP_REST_Request $request)
    {
        try {
            $body = json_decode($request->get_body(), true);
            $requestProperties = $this->propertyClass->searchParams($body); error_log(print_r($requestProperties, true));
            $searchResponse = $this->propertyClass->search($requestProperties);
            $response = new WP_REST_Response($searchResponse);
            $response->set_status(200);

            return rest_ensure_response($response);
        } catch (DestructuredException $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        } catch (Exception $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        }
    }

    function byAPN(WP_REST_Request $request)
    {
        try {
            $apn = $request->get_params()['apn'];
            $byAPNResponse = $this->propertyClass->byAPN($apn);
            $response = new WP_REST_Response($byAPNResponse);
            $response->set_status(200);

            return rest_ensure_response($response);
        } catch (DestructuredException $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        } catch (Exception $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        }
    }

    function byID(WP_REST_Request $request)
    {
        try {
            $id = $request->get_params()['id'];
            $byIDResponse = $this->propertyClass->byID($id);
            $response = new WP_REST_Response($byIDResponse);
            $response->set_status(200);

            return rest_ensure_response($response);
        } catch (DestructuredException $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        } catch (Exception $e) {
            return (new DestructuredException($e))->rest_ensure_response_error();
        }
    }
}
