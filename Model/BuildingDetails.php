<?php

namespace ORB\Real_Estate\Model;

class BuildingDetails {
    public int $stories;
    public int $yearBuilt;
    public string $sprinklers;
    public float $totalBuildingSize;

    public function __construct(int $stories = 1, int $yearBuilt = 0000, string $sprinklers = '', float $totalBuildingSize = 0.0)
    {
        $this->stories = $stories;
        $this->yearBuilt = $yearBuilt;
        $this->sprinklers = $sprinklers;
        $this->totalBuildingSize = $totalBuildingSize;
    }
}