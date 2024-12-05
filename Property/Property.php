<?php

namespace ORB\Real_Estate\Property;

use ORB\Real_Estate\Database\Database;
use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Model\BuildingDetails;
use ORB\Real_Estate\Model\LandDetails;
use ORB\Real_Estate\Model\Location;
use ORB\Real_Estate\Model\PropertyClass;
use ORB\Real_Estate\Model\RealEstateProperty;
use ORB\Real_Estate\Model\RequestProperties;
use ORB\Real_Estate\Model\SaleDetails;

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

    function create(object $property)
    {
        $location = new Location(
            $property['street_number'] ?? '',
            $property['street_name'] ?? '',
            $property['city'] ?? '',
            $property['state'] ?? '',
            $property['zipcode'] ?? '',
            $property['country'] ?? '',
            $property['coordinates'] ?? null
        );
        $saleDetails = new SaleDetails(
            $property['price'] ?? 0.00,
            $property['price_per_sqft'] ?? 0.00,
            $property['cap_rate'] ?? 0.0,
            $property['overview'] ?? '',
            $property['highlights'] ?? []
        );
        $buildingDetails = new BuildingDetails(
            $property['stories'] ?? 1,
            $property['year_built'] ?? 0000,
            $property['sprinklers'] ?? false,
            $property['total_building_size'] ?? 0.0
        );
        $landDetails = new LandDetails(
            $property['land_acres'] ?? 0.0,
            $property['land_sqft'] ?? 0.0,
            $property['zoning'] ?? '',
            $property['property_sub_type'] ?? [],
            $property['parking_spaces'] ?? 0
        );
        $images = $property['images'] ?? [];
        $providers = $property['providers'] ?? [];

        return new RealEstateProperty(
            '',
            $property['apn_parcel_id'] ?? 'N/A',
            PropertyClass::fromString($property['property_class']),
            $location,
            $saleDetails,
            $buildingDetails,
            $landDetails,
            $images,
            $providers
        );
    }

    function add(RealEstateProperty $property)
    {
        try {

            $results = $this->connection->get_results(
                "CALL addRealEstateProperty(
                {$property->apnParcelID},
                {$property->propertyClass->value},
                {$property->location->streetNumber},
                {$property->location->streetName},
                {$property->location->city},
                {$property->location->state},
                {$property->location->zipcode},
                {$property->location->country},
                {$property->location->coordinates},
                {$property->saleDetails->price},
                {$property->saleDetails->pricePerSqft},
                {$property->saleDetails->overview},
                {$property->saleDetails->setHighlights()},
                {$property->buildingDetails->stories},
                {$property->buildingDetails->yearBuilt},
                {$property->buildingDetails->sprinklers},
                {$property->buildingDetails->totalBldgSize},
                {$property->landDetails->parkingSpaces},
                {$property->landDetails->landAcres},
                {$property->landDetails->landSqft},
                {$property->landDetails->zoning},
                {$property->providers}
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

    public static function searchParams(object $property): RequestProperties
    {
        $propertyClass = PropertyClass::fromString($property['property_class']);
        $location = new Location(
            $property['city'] ?? '',
            $property['state'] ?? '',
            $property['zipcode'] ?? '',
            $property['country'] ?? '',
            $property['coordinates'] ?? null
        );
        $saleDetails = new SaleDetails(
            $property['price'] ?? 0.00,
            $property['price_per_sqft'] ?? 0.00,
            $property['cap_rate'] ?? 0.0,
            $property['overview'] ?? '',
            $property['highlights'] ?? []
        );
        $buildingDetails = new BuildingDetails(
            $property['stories'] ?? 1,
            $property['year_built'] ?? 0000,
            $property['sprinklers'] ?? false,
            $property['total_building_size'] ?? 0.0
        );
        $landDetails = new LandDetails(
            $property['land_acres'] ?? 0.0,
            $property['land_sqft'] ?? 0.0,
            $property['zoning'] ?? ''
        );
        $providers = $property['providers'] ?? [];

        return new RequestProperties($propertyClass, $location, $saleDetails, $buildingDetails, $landDetails, $providers);
    }

    function format($object)
    {

        if (is_serialized($object)) {
            return unserialize($object);
        }

        return $object;
    }

    function get(object $property)
    {
        try {
            $highlights = $this->format($property->highlights);

            return new RealEstateProperty(
                $property->id,
                $property->apn_parcel_id ?? 'N/A',
                $property->propertyClass ?? 'N/A',
                $property->street_number ?? '',
                $property->street_name ?? '',
                $property->city ?? '',
                $property->state ?? '',
                $property->zipcode ?? '',
                $property->country ?? '',
                $property->coordinates ?? '',
                $property->price ?? 0.00,
                $property->price_sqft ?? 0.0,
                $property->cap_rate ?? 0.0,
                $property->stories ?? 1,
                $property->year_built ?? 0000,
                $property->sprinklers ?? '',
                $property->parking_spaces ?? 0,
                $property->total_bldg_size ?? 0.0,
                $property->land_acres ?? 0.0,
                $property->land_sqft ?? 0.0,
                $property->zoning ?? '',
                $highlights,
                $property->overview ?? '',
                $property->provider_id ?? ''
            );
        } catch (TypeError $e) {
            throw new DestructuredException($e);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function residential(RequestProperties $requestProperties)
    {
        try {
            $location = $requestProperties->location;
            $saleDetails = $requestProperties->saleDetails;
            $buildingDetails = $requestProperties->buildingDetails;
            $landDetails = $requestProperties->landDetails;
            $providers = $requestProperties->providers;

            $results = $this->connection->get_results(
                "CALL searchResidentialRealEstate()"
            );

            if ($this->connection->last_error) {
                throw new Exception("Error executing stored procedure: " . $this->connection->last_error, 500);
            }

            if (!isset($results[0]) || !boolval($results[0])) {
                throw new Exception("No residential properties with the parameters could not be found in search.", 404);
            }

            $properties = [];

            foreach ($results as $property) {
                $properties[] = $this->get($property);
            }

            return $properties;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function commercial(RequestProperties $requestProperties)
    {
        try {
            $location = $requestProperties->location;
            $saleDetails = $requestProperties->saleDetails;
            $buildingDetails = $requestProperties->buildingDetails;
            $landDetails = $requestProperties->landDetails;
            $providers = $requestProperties->providers;

            $results = $this->connection->get_results(
                "CALL searchCommercialRealEstate()"
            );

            if ($this->connection->last_error) {
                throw new Exception("Error executing stored procedure: " . $this->connection->last_error, 500);
            }

            if (!isset($results[0]) || !boolval($results[0])) {
                throw new Exception("No commercial properties with the parameters could not be found in search.", 404);
            }

            $properties = [];

            foreach ($results as $property) {
                $properties[] = $this->get($property);
            }

            return $properties;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function search(RequestProperties $requestProperties)
    {
        try {
            $propertyClass = $requestProperties->propertyClass;
            $location = $requestProperties->location;
            $saleDetails = $requestProperties->saleDetails;
            $buildingDetails = $requestProperties->buildingDetails;
            $landDetails = $requestProperties->landDetails;
            $providers = $requestProperties->providers;

            $results = $this->connection->get_results(
                "CALL searchRealEstate('$propertyClass->value', '$location->city', '$location->zipcode', '$saleDetails->price')"
            );

            if ($this->connection->last_error) {
                throw new Exception("Error executing stored procedure: " . $this->connection->last_error, 500);
            }

            if (!isset($results[0]) || !boolval($results[0])) {
                throw new Exception("No properties with the parameters could not be found in search.", 404);
            }

            $properties = [];

            foreach ($results as $property) {
                $properties[] = $this->get($property);
            }

            return $properties;
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
