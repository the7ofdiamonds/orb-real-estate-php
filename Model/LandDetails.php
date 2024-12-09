<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class LandDetails
{
    public float $landAcres;
    public float $landSqft;
    public string $zoning;
    public array $propertySubType;
    public int $parkingSpaces;

    public function __construct($landAcres = 0.0, $landSqft = 0.0, $zoning = '', $propertySubType = [], $parkingSpaces = 0)
    {
        $this->landAcres = $landAcres ?? 0.0;
        $this->landSqft = $landSqft ?? 0.0;
        $this->zoning = $zoning ?? '';
        $this->propertySubType = $propertySubType ?? [];
        $this->parkingSpaces = $parkingSpaces ?? 0;
    }

    public function fromJSON(stdClass $land_details)
    {
        $this->landAcres = $land_details->land_acres ?? 0.0;
        $this->landSqft = $land_details->land_sqft ?? 0.0;
        $this->zoning = $land_details->zoning ?? '';
        $this->propertySubType = $land_details->property_sub_type ?? [];
        $this->parkingSpaces = $land_details->parking_spaces ?? 0;
        return $this;
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}
