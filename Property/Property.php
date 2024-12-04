<?php

namespace ORB\Real_Estate\Property;

use ORB\Real_Estate\Database\Database;
use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Model\RealEstateProperty;

use Exception;
use TypeError;

use wpdb;

class Property
{
    public wpdb $connection;

    public function __construct()
    {
        $this->connection = (new Database())->connection;
    }

    function add(RealEstateProperty $property)
    {
        try {
            $highlights = serialize($property->highlights);

            $results = $this->connection->get_results(
                "CALL addRealEstateProperty(
                '$property->apnParcelID',
                '$property->type',
                '$property->streetNumber',
                '$property->streetName',
                '$property->city',
                '$property->state',
                '$property->zipcode',
                '$property->country',
                '$property->coordinates',
                '$property->price',
                '$property->priceSF',
                '$property->capRate',
                '$property->stories',
                '$property->yearBuilt',
                '$property->sprinklers',
                '$property->parkingSpaces',
                '$property->totalBldgSize',
                '$property->landAcres',
                '$property->landSqft',
                '$property->zoning',
                '$highlights',
                '$property->overview',
                '$property->providerID'
                )"
            );

            if ($this->connection->last_error) {
                throw new Exception("Error executing stored procedure: " . $this->connection->last_error, 500);
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

    function format($object)
    {

        if (is_serialized($object)) {
            return unserialize($object);
        }

        return $object;
    }

    function get(object $object)
    {
        try {
            $highlights = $this->format($object->highlights);

            return new RealEstateProperty(
                $object->id,
                $object->apn_parcel_id ?? 'N/A',
                $object->type ?? 'N/A',
                $object->street_number ?? '',
                $object->street_name ?? '',
                $object->city ?? '',
                $object->state ?? '',
                $object->zipcode ?? '',
                $object->country ?? '',
                $object->coordinates ?? '',
                $object->price ?? 0.00,
                $object->price_sqft ?? 0.0,
                $object->cap_rate ?? 0.0,
                $object->stories ?? 1,
                $object->year_built ?? 0000,
                $object->sprinklers ?? '',
                $object->parking_spaces ?? 0,
                $object->total_bldg_size ?? 0.0,
                $object->land_acres ?? 0.0,
                $object->land_sqft ?? 0.0,
                $object->zoning ?? '',
                $highlights,
                $object->overview ?? '',
                $object->provider_id ?? ''
            );
        } catch (TypeError $e) {
            throw new DestructuredException($e);
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

            $results = $this->connection->get_results(
                "CALL getRealEstatePropertyByAPN('$apn')"
            );

            if ($this->connection->last_error) {
                throw new Exception("Error executing stored procedure: " . $this->connection->last_error, 500);
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

            $results = $this->connection->get_results(
                "CALL getRealEstatePropertyByID('$id')"
            );

            if ($this->connection->last_error) {
                throw new Exception("Error executing stored procedure: " . $this->connection->last_error, 500);
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
