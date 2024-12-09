<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class RealEstateProperty
{
    public ?string $id;
    public ?string $apnParcelID;
    public ?PropertyClass $propertyClass;
    public ?Location $location;
    public ?SaleDetails $saleDetails;
    public ?BuildingDetails $buildingDetails;
    public ?LandDetails $landDetails;
    public ?array $images;
    public array $contributors;

    public function __construct(
        $id = '',
        $apnParcelID = null,
        $propertyClass = null,
        $location = null,
        $saleDetails = null,
        $buildingDetails = null,
        $landDetails = null,
        $images = [],
        $contributors = []
    ) {
        $this->id = $id;
        $this->apnParcelID = $apnParcelID;
        $this->propertyClass = $propertyClass;
        $this->location = $location;
        $this->saleDetails = $saleDetails;
        $this->buildingDetails = $buildingDetails;
        $this->landDetails = $landDetails;
        $this->images = $images;
        $this->contributors = $contributors;
    }

    public function contributorsFromJSON($contributors)
    {

        if (is_null($contributors)) {
            return [];
        }

        $contributorsClass = [];

        foreach ($contributors as $contributor) {
            $contributorsClass[] = (new Contributor)->fromJSON($contributor);
        }

        return $contributorsClass;
    }

    public function fromJSON(stdClass $property)
    {
        $this->propertyClass = $property->property_class ? PropertyClass::fromString($property->property_class) : null;
        $this->apnParcelID = $property->apn_parcel_id ?? null;
        $this->location = $property->location ? (new Location)->fromJSON($property->location) : null;
        $this->saleDetails = $property->sale_details ? (new SaleDetails)->fromJSON($property->sale_details) : null;
        $this->buildingDetails = $property->building_details ? (new BuildingDetails)->fromJSON($property->building_details) : null;
        $this->landDetails = $property->land_details ? (new LandDetails)->fromJSON($property->land_details) : null;
        $this->images = $property->images ?? [];
        $this->contributors = $this->contributorsFromJSON($property->contributors);

        return $this;
    }

    public function contributorsFromDB($contributors)
    {

        if (is_null($contributors)) {
            return null;
        }

        return $this->contributorsFromJSON(json_decode($contributors));
    }

    public function fromDB(stdClass $property)
    {
        $this->id = $property->id ?? '';
        $this->apnParcelID = $property->apn_parcel_id ?? 'N/A';
        $this->propertyClass = $property->property_class ? PropertyClass::fromString($property->property_class) : PropertyClass::UNCLASSIFIED;
        $coordinates = is_string($property->coordinates) ? (new Coordinates)->fromDB($property->coordinates) : null;
        $this->location = new Location(
            $property->street_number ?? '',
            $property->street_name ?? '',
            $property->city ?? '',
            $property->state ?? '',
            $property->zipcode ?? '',
            $property->country ?? '',
            $coordinates
        );
        $this->saleDetails = new SaleDetails(
            $property->price ?? 0.00,
            $property->price_sf ?? 0.0,
            $property->overview ?? '',
            $property->highlights ? unserialize($property->highlights) : []
        );
        $this->buildingDetails = new BuildingDetails(
            $property->stories ?? 0,
            $property->year_built ?? 0000,
            $property->sprinklers ?? '',
            $property->total_bldg_size ?? 0.0
        );
        $this->landDetails = new LandDetails(
            $property->land_acres ?? 0.0,
            $property->land_sqft ?? 0.0,
            $property->zoning ?? '',
            $property->property_sub_type ?? [],
            $property->parking_spaces ?? 0
        );
        $this->images = $property->images ? unserialize($property->images) : [];
        $this->contributors = $this->contributorsFromDB($property->providers);

        return $this;
    }

    public function contributorsToJSON()
    {

        $contributorsJSON = null;

        if (is_null($this->contributors)) {
            return $contributorsJSON;
        }
        foreach ($this->contributors as $contributor) {
            $contributorsJSON[] = $contributor->toJSON();
        }

        return json_encode($contributorsJSON);
    }

    public function toJSON()
    {
        return [
            'id' => $this->id,
            'apn_parcel_id' => $this->apnParcelID,
            'property_class' => $this->propertyClass,
            'location' => [
                'street_number' => $this->location->streetNumber,
                'street_name' => $this->location->streetName,
                'city' => $this->location->city,
                'state' => $this->location->state,
                'zipcode' => $this->location->zipcode,
                'country' => $this->location->country,
                'coordinates' => [
                    'longitude' => $this->location->coordinates->longitude,
                    'latitude' => $this->location->coordinates->latitude
                ]
            ],
            'sale_details' => [
                'price' => $this->saleDetails->price,
                'price_per_sqft' => $this->saleDetails->pricePerSqft,
                'overview' => $this->saleDetails->overview,
                'highlights' => $this->saleDetails->highlights
            ],
            'building_details' => [
                'stories' => $this->buildingDetails->stories,
                'year_built' => $this->buildingDetails->yearBuilt,
                'sprinklers' => $this->buildingDetails->sprinklers,
                'total_bldg_size' => $this->buildingDetails->totalBldgSize
            ],
            'land_details' => [
                'land_acres' => $this->landDetails->landAcres,
                'land_sqft' => $this->landDetails->landSqft,
                'zoning' => $this->landDetails->zoning,
                'property_sub_type' => $this->landDetails->propertySubType,
                'parking_spaces' => $this->landDetails->parkingSpaces
            ],
            'images' => $this->images,
            'contributors' => $this->contributors
        ];
    }
}
