<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class RequestProperties
{
    public ?PropertyClass $propertyClass;
    public ?Location $location;
    public ?SaleDetails $saleDetails;
    public ?BuildingDetails $buildingDetails;
    public ?LandDetails $landDetails;
    public string $provider;

    public function __construct(PropertyClass $propertyClass = null, Location $location = null, SaleDetails $saleDetails = null, BuildingDetails $buildingDetails = null, LandDetails $landDetails = null, string $provider = '')
    {
        $this->propertyClass = $propertyClass;
        $this->location = $location;
        $this->saleDetails = $saleDetails;
        $this->buildingDetails = $buildingDetails;
        $this->landDetails = $landDetails;
        $this->provider = $provider;
    }

    function fromJSON(stdClass $property)
    {
        $this->propertyClass = isset($property->property_class) ? PropertyClass::fromString($property->property_class) : null;
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
            $property->sale_details->price ?? 0.00,
            $property->sale_details->price_per_sqft ?? 0.00,
            $property->sale_details->overview ?? '',
            isset($property->sale_details->highlights) ? $property->sale_details->highlights : []
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
        $this->provider = $property->provider ?? '';

        return $this;
    }
}
