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
    public ?array $providers;

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

    public function toJSON(stdClass $property)
    {
        return [
            'id' => $property->id,
            'apn_parcel_id' => $property->apn_parcel_id,
            'property_class' => $property->property_class,
            'location' => [
                'street_number' => $property->street_number,
                'street_name' => $property->street_name,
                'city' => $property->city,
                'state' => $property->state,
                'zipcode' => $property->zipcode,
                'country' => $property->country,
                'coordinates' => $property->coordinates ? json_decode($property->coordinates) : null
            ],
            'sale_details' => [
                'price' => $property->price,
                'price_per_sqft' => $property->price_sf,
                'overview' => $property->overview,
                'highlights' => $property->highlights ? unserialize($property->highlights) : []
            ],
            'building_details' => [
                'stories' => $property->stories,
                'year_built' => $property->year_built,
                'sprinklers' => $property->sprinklers,
                'total_building_size' => $property->total_bldg_size
            ],
            'land_details' => [
                'land_acres' => $property->land_acres,
                'land_sqft' => $property->land_sqft,
                'zoning' => $property->zoning
            ],
            'images' => $property->images ? json_decode($property->images) : [],
            'providers' => $property->providers ? json_decode($property->providers) : []
        ];
    }

    public function fromJSON(stdClass $property)
    {
        $this->propertyClass = PropertyClass::fromString($property->property_class ?? 'N/A');
        $coordinates = new Coordinates(
            $property->location->coordinates->longitude ?? 0.0,
            $property->location->coordinates->latitude ?? 0.0
        );
        $this->location = new Location(
            $property->location->street_number ?? '',
            $property->location->street_name ?? '',
            $property->location->city ?? '',
            $property->location->state ?? '',
            $property->location->zipcode ?? '',
            $property->location->country ?? '',
            $coordinates
        );
        $this->saleDetails = new SaleDetails(
            $property->price ?? 0.00,
            $property->price_per_sqft ?? 0.00,
            $property->overview ?? '',
            $property->highlights
        );
        $this->buildingDetails = new BuildingDetails(
            $property->building_details->stories ?? 1,
            $property->building_details->year_built ?? 0000,
            $property->building_details->sprinklers ?? false,
            $property->building_details->total_building_size ?? 0.0
        );
        $this->landDetails = new LandDetails(
            $property->land_details->land_acres ?? 0.0,
            $property->land_details->land_sqft ?? 0.0,
            $property->land_details->zoning ?? ''
        );
        $this->images = $property->images ?? [];
        $this->providers = $property->providers ?? [];

        return $this;
    }
}
