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
                    :property_class, :street_number, :street_name, :city, :state,
                    :zipcode, :country, :coordinates, :price, :price_per_sqft, :overview,
                    :highlights, :stories, :year_built, :sprinklers, :total_building_size,
                    :parking_spaces, :land_acres, :land_sqft, :zoning, :apn_parcel_id, :providers
                )
            ");

            $stmt->bindParam(':property_class', $propertyClass);
            $stmt->bindParam(':street_number', $streetNumber);
            $stmt->bindParam(':street_name', $streetName);
            $stmt->bindParam(':city', $city);
            $stmt->bindParam(':state', $state);
            $stmt->bindParam(':zipcode', $zipcode);
            $stmt->bindParam(':country', $country);
            $stmt->bindParam(':coordinates', $coordinates);
            $stmt->bindParam(':price', $price, PDO::PARAM_INT);
            $stmt->bindParam(':price_per_sqft', $pricePerSqft);
            $stmt->bindParam(':overview', $overview);
            $stmt->bindParam(':highlights', $highlights);
            $stmt->bindParam(':stories', $stories, PDO::PARAM_INT);
            $stmt->bindParam(':year_built', $yearBuilt, PDO::PARAM_INT);
            $stmt->bindParam(':sprinklers', $sprinklers);
            $stmt->bindParam(':total_building_size', $totalBldgSize);
            $stmt->bindParam(':parking_spaces', $parkingSpaces, PDO::PARAM_INT);
            $stmt->bindParam(':land_acres', $landAcres);
            $stmt->bindParam(':land_sqft', $landSqft);
            $stmt->bindParam(':zoning', $zoning);
            $stmt->bindParam(':apn_parcel_id', $apnParcelID);
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
            $coords = $property->coordinates ? json_decode($property->coordinates) : null;
            $highlights = $this->format($property->highlights);
            $images = $property->images ? json_decode($property->images) : [];
            $providers = $property->providers ? json_decode($property->providers) : [];

            $coordinates = new Coordinates(
                $coords->longitude ?? 0.0,
                $coords->latitude ?? 0.0
            );
            $location = new Location(
                $property->street_number ?? '',
                $property->street_name ?? '',
                $property->city ?? '',
                $property->state ?? '',
                $property->zipcode ?? '',
                $property->country ?? '',
                $coordinates
            );
            $saleDetails = new SaleDetails(
                $property->price ?? 0.00,
                $property->price_per_sqft ?? 0.00,
                $property->overview ?? '',
                $highlights
            );
            $buildingDetails = new BuildingDetails(
                $property->stories ?? 1,
                $property->year_built ?? 0000,
                $property->sprinklers ?? '',
                $property->total_building_size ?? 0.0
            );
            $landDetails = new LandDetails(
                $property->land_acres ?? 0.0,
                $property->land_sqft ?? 0.0,
                $property->zoning ?? '',
                $property->property_sub_type ?? [],
                $property->parking_spaces ?? 0
            );

            return new RealEstateProperty(
                $property->id,
                $property->apn_parcel_id ?? 'N/A',
                PropertyClass::fromString($property->property_class),
                $location,
                $saleDetails,
                $buildingDetails,
                $landDetails,
                $images,
                $providers
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

            $stmt = $this->connection->prepare(
                "CALL getRealEstatePropertyByAPN(:apn)"
            );

            $stmt->bindParam(':apn', $apn);
            
            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_OBJ);
                return $this->get($result[0]);
            }

            return false;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }

    function byID(string $id)
    {
        try {

            $stmt = $this->connection->prepare(
                "CALL getRealEstatePropertyByID(:id)"
            );

            $stmt->bindParam(':id', $id);
            
            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_OBJ);
                return $this->get($result[0]);
            }

            return false;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }
}
