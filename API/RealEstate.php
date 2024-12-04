<?php

namespace ORB\Real_Estate\API;

use ORB\Real_Estate\Exception\DestructuredException;

use Exception;
use TypeError;

use ORB\Real_Estate\Property\Property;
use ORB\Real_Estate\Model\RealEstateProperty;

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
            $body = $request->get_body();
            $decodedBody = json_decode($body, true);
            $apnParcelID = isset($decodedBody['apn_parcel_id']) ? $decodedBody['apn_parcel_id'] : 'N/A';
            $type = isset($decodedBody['type']) ? $decodedBody['type'] : 'N/A';
            $streetNumber = isset($decodedBody['street_number']) ? $decodedBody['street_number'] : '';
            $streetName = isset($decodedBody['street_address']) ? $decodedBody['street_address'] : '';
            $city = isset($decodedBody['city']) ? $decodedBody['city'] : '';
            $state = isset($decodedBody['state']) ? $decodedBody['state'] : '';
            $zipcode = isset($decodedBody['zipcode']) ? $decodedBody['zipcode'] : '';
            $country = isset($decodedBody['country']) ? $decodedBody['country'] : '';
            $coordinates = isset($decodedBody['coordinates']) ? $decodedBody['coordinates'] : '';
            $price = isset($decodedBody['price']) ? $decodedBody['price'] : 0;
            $priceSF = isset($decodedBody['price_sqft']) ? $decodedBody['price_sqft'] : 0.0;
            $capRate = isset($decodedBody['cap_rate']) ? $decodedBody['cap_rate'] : 0.0;
            $stories = isset($decodedBody['stories']) ? $decodedBody['stories'] : 1;
            $yearBuilt = isset($decodedBody['year_built']) ? $decodedBody['year_built'] : 0000;
            $sprinklers = isset($decodedBody['sprinklers']) ? $decodedBody['sprinklers'] : '';
            $parkingSpaces = isset($decodedBody['parking_spaces']) ? $decodedBody['parking_spaces'] : 0;
            $totalBldgSize = isset($decodedBody['total_bldg_size']) ? $decodedBody['total_bldg_size'] : 0.0;
            $landAcres = isset($decodedBody['land_acres']) ? $decodedBody['land_acres'] : 0.0;
            $landSqft = isset($decodedBody['land_sqft']) ? $decodedBody['land_sqft'] : 0.0;
            $zoning = isset($decodedBody['zoning']) ? $decodedBody['zoning'] : '';
            $highlights = isset($decodedBody['highlights']) ? $decodedBody['highlights'] : [];
            $overview = isset($decodedBody['overview']) ? $decodedBody['overview'] : '';
            $providerID = isset($decodedBody['provider_id']) ? $decodedBody['provider_id'] : '';

            $property = new RealEstateProperty(
                '',
                $apnParcelID,
                $type,
                $streetNumber,
                $streetName,
                $city,
                $state,
                $zipcode,
                $country,
                $coordinates,
                $price,
                $priceSF,
                $capRate,
                $stories,
                $yearBuilt,
                $sprinklers,
                $parkingSpaces,
                $totalBldgSize,
                $landAcres,
                $landSqft,
                $zoning,
                $highlights,
                $overview,
                $providerID
            );

            $add = $this->propertyClass->add($property);

            if($add){
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
            $query = $request->get_body();
            $residentialResponse = $this->propertyClass->residential($query);
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
            $query = $request->get_body();
            $commercialResponse = $this->propertyClass->commercial($query);
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
            $query = $request->get_body();
            $searchResponse = $this->propertyClass->search($query);
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
