<?php

namespace ORB\Real_Estate\Model;

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
}
