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
    public $providers;

    public function __construct(
        $id = '',
        $apnParcelID = 'N/A',
        $propertyClass = null,
        $location = null,
        $saleDetails = null,
        $buildingDetails = null,
        $landDetails = null,
        $images = [],
        $providers = []
    ) {
        $this->id = $id;
        $this->apnParcelID = $apnParcelID;
        $this->propertyClass = $propertyClass;
        $this->location = $location;
        $this->saleDetails = $saleDetails;
        $this->buildingDetails = $buildingDetails;
        $this->landDetails = $landDetails;
        $this->images = $images;
        $this->providers = $providers;
    }

    public function setProviders()
    {
        return json_encode($this->providers);
    }

    public function fromJSON(stdClass $property)
    {
        $this->propertyClass = PropertyClass::fromString($property->property_class);
        $this->apnParcelID = $property->apn_parcel_id;
        $this->location = (new Location)->fromJSON($property->location);
        $this->saleDetails = (new SaleDetails)->fromJSON($property->sale_details);
        $this->buildingDetails = (new BuildingDetails)->fromJSON($property->building_details);
        $this->landDetails = (new LandDetails)->fromJSON($property->land_details);
        $this->images = $property->images ?? [];
        $this->providers = $property->providers ?? [];

        return $this;
    }

    public function fromDB(stdClass $property)
    {
        $this->id = $property->id;
        $this->apnParcelID = $property->apn_parcel_id;
        $this->propertyClass = PropertyClass::fromString($property->property_class);
        $coordinates = (new Coordinates)->fromJSON(json_decode($property->coordinates));
        $this->location = new Location(
            $property->street_number,
            $property->street_name,
            $property->city,
            $property->state,
            $property->zipcode,
            $property->country,
            $coordinates
        );
        $this->saleDetails = new SaleDetails(
            $property->price,
            $property->price_sf,
            $property->overview,
            unserialize($property->highlights)
        );
        $this->buildingDetails = new BuildingDetails(
            $property->stories,
            $property->year_built,
            $property->sprinklers,
            $property->total_bldg_size
        );
        $this->landDetails = new LandDetails(
            $property->land_acres,
            $property->land_sqft,
            $property->zoning,
            $property->property_sub_type,
            $property->parking_spaces
        );
        $this->images = $property->images ? unserialize($property->images) : [];
        $this->providers = $property->providers ? json_decode($property->providers) : [];

        return $this;
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
            'providers' => $this->providers
        ];
    }
}
