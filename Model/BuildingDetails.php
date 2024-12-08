<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class BuildingDetails
{
    public int $stories;
    public int $yearBuilt;
    public string $sprinklers;
    public float $totalBldgSize;

    public function __construct(int $stories = 1, int $yearBuilt = 0000, string $sprinklers = '', float $totalBldgSize = 0.0)
    {
        $this->stories = $stories;
        $this->yearBuilt = $yearBuilt;
        $this->sprinklers = $sprinklers;
        $this->totalBldgSize = $totalBldgSize;
    }

    public function fromJSON(stdClass $building_details)
    {
        $this->stories = $building_details->stories ?? 1;
        $this->yearBuilt = $building_details->year_built ?? 0000;
        $this->sprinklers = $building_details->sprinklers ?? false;
        $this->totalBldgSize = $building_details->total_building_size ?? 0.0;
        return $this;
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}
