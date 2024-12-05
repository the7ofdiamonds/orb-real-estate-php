<?php

namespace ORB\Real_Estate\Model;

class LandDetails {
    public float $landAcres;
    public float $landSqft;
    public string $zoning;

    public function __construct(float $landAcres = 0.0, float $landSqft = 0.0, string $zoning = '')
    {
        $this->landAcres = $landAcres;
        $this->landSqft = $landSqft;
        $this->zoning = $zoning;
    }
}