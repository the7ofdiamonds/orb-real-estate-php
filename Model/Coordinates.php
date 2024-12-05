<?php

namespace ORB\Real_Estate\Model;

class Coordinates
{
    public float $longitude;
    public float $latitude;

    public function __construct(float $longitude, float $latitude)
    {
        $this->longitude = $longitude;
        $this->latitude = $latitude;
    }

    public function setCoordinates()
    {
        return json_encode([
            'longitude' => $this->longitude,
            'latitude' => $this->latitude
        ]);
    }
}
