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

    public function fromJSON(stdClass $property)
    {
        $this->propertyClass = PropertyClass::fromString($property->property_class);
        $this->location = (new Location)->fromJSON($property->location);
        $this->saleDetails = (new SaleDetails)->fromJSON($property->sale_details);
        $this->buildingDetails = new BuildingDetails($property->building_details);
        $this->landDetails = new LandDetails($property->land_details);
        $this->images = $property->images ?? [];
        $this->providers = $property->providers ?? [];

        return $this;
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}
