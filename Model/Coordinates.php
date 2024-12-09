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

    public function fromDB(string $coordinates)
    {
        $coordinates = json_decode($coordinates);
        $this->longitude = $coordinates->longitude ?? 0.0;
        $this->latitude = $coordinates->latitude ?? 0.0;
        return $this;
    }

    public function toJSON()
    {
        return [
            'longitude' => $this->longitude ?? 0.0,
            'latitude' => $this->latitude ?? 0.0
        ];
    }

    public function toDB()
    {
        return json_encode($this->toJSON());
    }
}
