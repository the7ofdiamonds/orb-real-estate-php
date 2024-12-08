<?php

namespace ORB\Real_Estate\Property;

use ORB\Real_Estate\Database\Database;
use ORB\Real_Estate\Exception\DestructuredException;
use ORB\Real_Estate\Model\RealEstateProperty;
use ORB\Real_Estate\Model\RequestProperties;

use Exception;

use PDO;
use PDOException;

class Property
{
    public PDO $connection;

    public function __construct()
    {
        $this->connection = (new Database())->getConnection();
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
            $coordinates = $property->location->coordinates->toJSON() ?? null;
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

    function search(RequestProperties $requestProperties)
    {
        try {
            $propertyClass = $requestProperties->propertyClass->value;
            $location = $requestProperties->location;
            $saleDetails = $requestProperties->saleDetails;
            $buildingDetails = $requestProperties->buildingDetails;
            $landDetails = $requestProperties->landDetails;
            $provider = $requestProperties->provider;

            $stmt = $this->connection->prepare(
                "CALL searchRealEstate(
                :property_class, :street_number, :street_name, :city, :state, :zipcode, :country, :coordinates,
                :price, :price_per_sqft,
                :stories, :year_built, :sprinklers, :total_building_size,
                :land_acres, :land_sqft, :zoning, :parking_spaces,
                :provider)"
            );

            $coordinates = $location->coordinates->toJSON();

            $stmt->bindParam(':property_class', $propertyClass);
            $stmt->bindParam(':street_number', $location->streetNumber);
            $stmt->bindParam(':street_name', $location->streetName);
            $stmt->bindParam(':city', $location->city);
            $stmt->bindParam(':state', $location->state);
            $stmt->bindParam(':zipcode', $location->zipcode);
            $stmt->bindParam(':country', $location->country);
            $stmt->bindParam(':coordinates', $coordinates);
            $stmt->bindParam(':price', $saleDetails->price);
            $stmt->bindParam(':price_per_sqft', $saleDetails->pricePerSqft);
            $stmt->bindParam(':stories', $buildingDetails->stories);
            $stmt->bindParam(':year_built', $buildingDetails->yearBuilt);
            $stmt->bindParam(':sprinklers', $buildingDetails->sprinklers);
            $stmt->bindParam(':total_building_size', $buildingDetails->totalBldgSize);
            $stmt->bindParam(':land_acres', $landDetails->landAcres);
            $stmt->bindParam(':land_sqft', $landDetails->landSqft);
            $stmt->bindParam(':zoning', $landDetails->zoning);
            $stmt->bindParam(':parking_spaces', $landDetails->parkingSpaces);
            $stmt->bindParam(':provider', $provider);

            $properties = [];

            if ($stmt->execute()) {
                $results = $stmt->fetchAll(PDO::FETCH_OBJ);

                foreach ($results as $property) {
                    $properties[] = (new RealEstateProperty())->toJSON($property);
                }

                return $properties;
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
                return (new RealEstateProperty())->toJSON($result[0]);
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
                return (new RealEstateProperty())->toJSON($result[0]);
            }

            return false;
        } catch (DestructuredException $e) {
            throw new DestructuredException($e);
        } catch (Exception $e) {
            throw new DestructuredException($e);
        }
    }
}
