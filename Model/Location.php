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
    public array $coordinates;

    public function __construct(string $streetNumber = '', string $streetName = '', string $city = '', string $state = '', string $zipcode = '', string $country = '', array $coordinates = [])
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
