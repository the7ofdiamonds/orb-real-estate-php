<?php

namespace ORB\Real_Estate\Model;

class RequestProperties {
    public PropertyClass $propertyClass;
    public Location $location;
    public SaleDetails $saleDetails;
    public BuildingDetails $buildingDetails;
    public LandDetails $landDetails;
    public array $providers;

    public function __construct(PropertyClass $propertyClass, Location $location, SaleDetails $saleDetails, BuildingDetails $buildingDetails, LandDetails $landDetails, array $providers)
    {
        $this->propertyClass = $propertyClass;
        $this->location = $location;
        $this->saleDetails = $saleDetails;
        $this->buildingDetails = $buildingDetails;
        $this->landDetails = $landDetails;
        $this->providers = $providers;
    }
}