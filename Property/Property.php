<?php

namespace ORB\Real_Estate\Property;

use ORB\Real_Estate\Database\Database;
use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Model\BuildingDetails;
use ORB\Real_Estate\Model\Coordinates;
use ORB\Real_Estate\Model\LandDetails;
use ORB\Real_Estate\Model\Location;
use ORB\Real_Estate\Model\PropertyClass;
use ORB\Real_Estate\Model\RealEstateProperty;
use ORB\Real_Estate\Model\RequestProperties;
use ORB\Real_Estate\Model\SaleDetails;

use stdClass;
use Exception;
use TypeError;

use PDO;
use PDOException;

class Property
{
    public PDO $connection;

    public function __construct()
    {
        $this->connection = (new Database())->getConnection();
    }

    function create(stdClass $property)
    {
        $coordinates = new Coordinates(
            $property->longitude ?? 0.0,
            $property->latitude ?? 0.0
        );
        $location = new Location(
            $property->street_number ?? '',
            $property->street_name ?? '',
            $property->city ?? '',
            $property->state ?? '',
            $property->zipcode ?? '',
            $property->country ?? '',
            $coordinates ?? null
        );
        $saleDetails = new SaleDetails(
            $property->price ?? 0.00,
            $property->price_per_sqft ?? 0.00,
            $property->overview ?? '',
            $property->highlights ?? []
        );
        $buildingDetails = new BuildingDetails(
            $property->stories ?? 1,
            $property->year_built ?? 0000,
            $property->sprinklers ?? false,
            $property->total_building_size ?? 0.0
        );
        $landDetails = new LandDetails(
            $property->land_acres ?? 0.0,
            $property->land_sqft ?? 0.0,
            $property->zoning ?? '',
            $property->property_sub_type ?? [],
            $property->parking_spaces ?? 0
        );
        $images = $property->images ?? [];
        $providers = $property->providers ?? [];

        return new RealEstateProperty(
            '',
            $property->apn_parcel_id ?? 'N/A',
            PropertyClass::fromString($property->property_class),
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
            $propertyClass = $property->propertyClass->value ?? null;
            $streetNumber = $property->location->streetNumber ?? null;
            $streetName = $property->location->streetName ?? null;
            $city = $property->location->city ?? null;
            $state = $property->location->state ?? null;
            $zipcode = $property->location->zipcode ?? null;
            $country = $property->location->country ?? null;
            $coordinates = $property->location->coordinates->setCoordinates() ?? null;
            $price = $property->saleDetails->price ?? null;
            $pricePerSqft = $property->saleDetails->pricePerSqft ?? null;
            $overview = $property->saleDetails->overview ?? null;
            $highlights = $property->saleDetails->setHighlights() ?? null;
            $stories = $property->buildingDetails->stories ?? null;
            $yearBuilt = $property->buildingDetails->yearBuilt ?? null;
            $sprinklers = $property->buildingDetails->sprinklers ?? null;
            $totalBldgSize = $property->buildingDetails->totalBldgSize ?? null;
            $parkingSpaces = $property->landDetails->parkingSpaces ?? null;
            $landAcres = $property->landDetails->landAcres ?? null;
            $landSqft = $property->landDetails->landSqft ?? null;
            $zoning = $property->landDetails->zoning ?? null;
            $apnParcelID = $property->apnParcelID ?? null;
            $providers = $property->setProviders() ?? null;

            $stmt = $this->connection->prepare("
            CALL addRealEstateProperty(
                :propertyClass, :streetNumber, :streetName, :city, :state,
                :zipcode, :country, :coordinates, :price, :pricePerSqft,
                :overview, :highlights, :stories, :yearBuilt, :sprinklers,
                :totalBldgSize, :parkingSpaces, :landAcres, :landSqft,
                :zoning, :apnParcelID, :providers
            )
        ");

            $stmt->bindParam(':propertyClass', $propertyClass);
            $stmt->bindParam(':streetNumber', $streetNumber);
            $stmt->bindParam(':streetName', $streetName);
            $stmt->bindParam(':city', $city);
            $stmt->bindParam(':state', $state);
            $stmt->bindParam(':zipcode', $zipcode);
            $stmt->bindParam(':country', $country);
            $stmt->bindParam(':coordinates', $coordinates);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':pricePerSqft', $pricePerSqft);
            $stmt->bindParam(':overview', $overview);
            $stmt->bindParam(':highlights', $highlights);
            $stmt->bindParam(':stories', $stories);
            $stmt->bindParam(':yearBuilt', $yearBuilt);
            $stmt->bindParam(':sprinklers', $sprinklers);
            $stmt->bindParam(':totalBldgSize', $totalBldgSize);
            $stmt->bindParam(':parkingSpaces', $parkingSpaces);
            $stmt->bindParam(':landAcres', $landAcres);
            $stmt->bindParam(':landSqft', $landSqft);
            $stmt->bindParam(':zoning', $zoning);
            $stmt->bindParam(':apnParcelID', $apnParcelID);
            $stmt->bindParam(':providers', $providers);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        } catch (PDOException $e) {
            throw new DestructuredException($e);
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

            $results = $this->connection->prepare(
                "CALL searchResidentialRealEstate()"
            );

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

            $results = $this->connection->prepare(
                "CALL searchCommercialRealEstate()"
            );

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

            $results = $this->connection->prepare(
                "CALL searchRealEstate('$propertyClass->value', '$location->city', '$location->zipcode', '$saleDetails->price')"
            );

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

            $results = $this->connection->prepare(
                "CALL getRealEstatePropertyByAPN('$apn')"
            );

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

            $results = $this->connection->prepare(
                "CALL getRealEstatePropertyByID('$id')"
            );

            return $this->get($results[0]);
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }
}
