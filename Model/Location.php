<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class Location
{
    public string $streetNumber;
    public string $streetName;
    public string $city;
    public string $state;
    public string $zipcode;
    public string $country;
    public Coordinates $coordinates;

    public function __construct(string $streetNumber = null, string $streetName = null, string $city = null, string $state = null, string $zipcode = null, string $country = null, Coordinates $coordinates = null)
    {
        $this->streetNumber = $streetNumber;
        $this->streetName = $streetName;
        $this->city = $city;
        $this->state = $state;
        $this->zipcode = $zipcode;
        $this->country = $country;
        $this->coordinates = $coordinates;
    }

    public function fromJSON(stdClass $location)
    {
        $this->streetNumber = $location->street_number ?? '';
        $this->streetName = $location->street_name ?? '';
        $this->city = $location->city ?? '';
        $this->state = $location->state ?? '';
        $this->zipcode = $location->zipcode ?? '';
        $this->country = $location->country ?? '';
        $this->coordinates = (new Coordinates)->fromJSON($location->coordinates);
        return $this;
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}
