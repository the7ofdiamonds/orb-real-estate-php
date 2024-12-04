<?php

namespace ORB\Real_Estate\Model;

use JsonSerializable;

class RealEstateProperty implements JsonSerializable
{
    public string $id;
    public string $type;
    public string $propertyClass;
    public string $imagesJson;
    public array $images;
    public string $streetNumber;
    public string $streetName;
    public string $city;
    public string $state;
    public string $zipcode;
    public string $country;
    public string $coordinates;
    public int $price;
    public int $priceSF;
    public float $capRate;

    // private $leased;
    // private $tenancy;

    // public string $property;
    // public string $propertySubType;

    // private String additionalSubTypesJson;

    // public array $additionalSubTypes;
    public int $stories;
    public int $yearBuilt;
    public string $sprinklers;
    public int $parkingSpaces;
    public float $totalBldgSize;
    public float $landAcres;
    public float $landSqft;
    public string $zoning;
    public string $apnParcelID;

    // private String highlightsJson;

    public array $highlights;
    public string $overview;
    public string $providerID;

    public function __construct(
        $id = '',
        $apnParcelID = 'N/A',
        $type = 'N/A',
        $streetNumber = '',
        $streetName = '',
        $city = '',
        $state = '',
        $zipcode = '',
        $country = '',
        $coordinates = '',
        $price = 0,
        $priceSF = 0.0,
        $capRate = 0.0,
        $stories = 1,
        $yearBuilt = 0000,
        $sprinklers = '',
        $parkingSpaces = 0,
        $totalBldgSize = 0.0,
        $landAcres = 0.0,
        $landSqft = 0.0,
        $zoning = '',
        $highlights = [],
        $overview = '',
        $providerID = ''
    ) {
        $this->id = $id;
        $this->apnParcelID = $apnParcelID;
        $this->type = $type;
        $this->streetNumber = $streetNumber;
        $this->streetName = $streetName;
        $this->city = $city;
        $this->state = $state;
        $this->zipcode = $zipcode;
        $this->country = $country;
        $this->coordinates = $coordinates;
        $this->price = $price;
        $this->priceSF = $priceSF;
        $this->capRate = $capRate;
        $this->stories = $stories;
        $this->yearBuilt = $yearBuilt;
        $this->sprinklers = $sprinklers;
        $this->parkingSpaces = $parkingSpaces;
        $this->totalBldgSize = $totalBldgSize;
        $this->landAcres = $landAcres;
        $this->landSqft = $landSqft;
        $this->zoning = $zoning;
        $this->highlights = $highlights;
        $this->overview = $overview;
        $this->providerID = $providerID;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'street_number' => $this->streetNumber,
            'street_name' => $this->streetName,
            'city' => $this->city,
            'zipcode' => $this->zipcode,
            'country' => $this->country,
            'coordinates' => $this->coordinates,
            'price' => $this->price,
            'price_sqft' => $this->priceSF,
            'cap_rate' => $this->capRate,
            'stories' => $this->stories,
            'year_built' => $this->yearBuilt,
            'sprinklers' => $this->sprinklers,
            'parking_spaces' => $this->parkingSpaces,
            'total_bldg_size' => $this->totalBldgSize,
            'land_acres' => $this->landAcres,
            'land_sqft' => $this->landSqft,
            'zoning' => $this->zoning,
            'highlights' => $this->highlights,
            'overview' => $this->overview,
            'provider_id' => $this->providerID
        ];
    }
}
