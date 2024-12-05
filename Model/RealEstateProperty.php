<?php

namespace ORB\Real_Estate\Model;

use JsonSerializable;

class RealEstateProperty implements JsonSerializable
{
    public ?string $id;
    public ?string $apnParcelID;
    public ?PropertyClass $propertyClass;
    public ?Location $location;
    public ?SaleDetails $saleDetails;
    public ?BuildingDetails $buildingDetails;
    public ?LandDetails $landDetails;
    private ?array $images;
    private ?array $providers;

    public function __construct(
        $id = '',
        $apnParcelID = 'N/A',
        $propertyClass = '',
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

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'apnParcelID' => $this->apnParcelID,
            'property_class' => $this->propertyClass,
            'location' => $this->location,
            'sale_details' => $this->saleDetails,
            'building_details' => $this->buildingDetails,
            'land_details' => $this->landDetails,
            'images' => $this->images,
            'providers' => $this->providers
        ];
    }

    public function setImages()
    {
        return serialize($this->images);
    }

    public function getImages()
    {
        if (!is_serialized($this->images)) {
            return $this->images;
        }

        return serialize($this->images);
    }

    public function setProviders()
    {
        return serialize($this->providers);
    }

    public function getProviders()
    {
        if (!is_serialized($this->providers)) {
            return $this->providers;
        }

        return serialize($this->providers);
    }
}
