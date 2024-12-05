<?php

namespace ORB\Real_Estate\Model;

class LandDetails
{
    public float $landAcres;
    public float $landSqft;
    public string $zoning;
    public array $propertySubType;
    public int $parkingSpaces;

    public function __construct(float $landAcres = 0.0, float $landSqft = 0.0, string $zoning = '', array $propertySubType = [], int $parkingSpaces = 0)
    {
        $this->landAcres = $landAcres;
        $this->landSqft = $landSqft;
        $this->zoning = $zoning;
        $this->propertySubType = $propertySubType;
        $this->parkingSpaces = $parkingSpaces;
    }
}
