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
    public ?string $provider;

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
        $this->location = (new Location)->fromJSON($property->location);
        $this->saleDetails = (new SaleDetails)->fromJSON($property->sale_details);
        $this->buildingDetails = (new BuildingDetails)->fromJSON($property->building_details);
        $this->landDetails = (new LandDetails)->fromJSON($property->land_details);
        $this->provider = $property->provider ?? 0;
        return $this;
    }
}
