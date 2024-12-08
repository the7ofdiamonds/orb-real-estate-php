<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class Coordinates
{
    public float $longitude;
    public float $latitude;

    public function __construct(float $longitude = 0.0, float $latitude = 0.0)
    {
        $this->longitude = $longitude;
        $this->latitude = $latitude;
    }

    public function fromJSON(stdClass $coordinates)
    {
        $this->longitude = $coordinates->longitude ?? 0.0;
        $this->latitude = $coordinates->latitude ?? 0.0;
        return $this;
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}
