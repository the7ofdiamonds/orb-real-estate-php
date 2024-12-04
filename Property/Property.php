<?php

namespace ORB\Real_Estate\Property;

use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Model\RealEstateProperty;

use Exception;

class Property
{

    function add(RealEstateProperty $property)
    {
        try {
            global $wpdb;

            $results = $wpdb->get_results(
                "CALL addRealEstateProperty('$property->type')"
            );

            if ($wpdb->last_error) {
                throw new Exception("Error executing stored procedure: " . $wpdb->last_error, 500);
            }

            if (!isset($results[0]) || !boolval($results[0])) {
                throw new Exception('Property could not be added.', 404);
            }

            return true;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function get(object $object)
    {
        try {
            $id = isset($object['id']) ? $object['id'] : 'N/A';
            $apnParcelID = isset($object['apn_parcel_id']) ? $object['apn_parcel_id'] : 'N/A';
            $type = isset($object['type']) ? $object['type'] : 'N/A';
            $streetNumber = isset($object['street_number']) ? $object['street_number'] : '';
            $streetName = isset($object['street_address']) ? $object['street_address'] : '';
            $city = isset($object['city']) ? $object['city'] : '';
            $state = isset($object['state']) ? $object['state'] : '';
            $zipcode = isset($object['zipcode']) ? $object['zipcode'] : '';
            $country = isset($object['country']) ? $object['country'] : '';
            $coordinates = isset($object['coordinates']) ? $object['coordinates'] : '';
            $price = isset($object['price']) ? $object['price'] : 0;
            $priceSF = isset($object['price_sqft']) ? $object['price_sqft'] : 0.0;
            $capRate = isset($object['cap_rate']) ? $object['cap_rate'] : 0.0;
            $stories = isset($object['stories']) ? $object['stories'] : 1;
            $yearBuilt = isset($object['year_built']) ? $object['year_built'] : 0000;
            $sprinklers = isset($object['sprinklers']) ? $object['sprinklers'] : '';
            $parkingSpaces = isset($object['parking_spaces']) ? $object['parking_spaces'] : 0;
            $totalBldgSize = isset($object['total_bldg_size']) ? $object['total_bldg_size'] : 0.0;
            $landAcres = isset($object['land_acres']) ? $object['land_acres'] : 0.0;
            $landSqft = isset($object['land_sqft']) ? $object['land_sqft'] : 0.0;
            $zoning = isset($object['zoning']) ? $object['zoning'] : '';
            $highlights = isset($object['highlights']) ? $object['highlights'] : [];
            $overview = isset($object['overview']) ? $object['overview'] : '';
            $providerID = isset($object['provider_id']) ? $object['provider_id'] : '';

            return new RealEstateProperty(
                $id,
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
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function residential($query)
    {
        try {
            error_log(print_r($query, true));

            return $query;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function commercial($query)
    {
        try {
            error_log(print_r($query, true));

            return $query;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function search($query)
    {
        try {
            error_log(print_r($query, true));

            return $query;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function byAPN(string $apn)
    {
        try {
            global $wpdb;

            $results = $wpdb->get_results(
                "CALL getRealEstatePropertyByAPN('$apn')"
            );

            if ($wpdb->last_error) {
                throw new Exception("Error executing stored procedure: " . $wpdb->last_error, 500);
            }

            if (!isset($results[0]) || !boolval($results[0])) {
                throw new Exception("Property with the APN#{$apn} could not be found.", 404);
            }

            return $this->get($results[0]);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function byID(string $id)
    {
        try {
            global $wpdb;

            $results = $wpdb->get_results(
                "CALL getRealEstatePropertyByID('$id')"
            );

            if ($wpdb->last_error) {
                throw new Exception("Error executing stored procedure: " . $wpdb->last_error, 500);
            }

            if (!isset($results[0]) || !boolval($results[0])) {
                throw new Exception("Property with the ID#{$id} could not be found.", 404);
            }

            return $this->get($results[0]);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }
}
