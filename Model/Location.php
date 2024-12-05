<?php

namespace ORB\Real_Estate\Model;

class Location {
    public string $city;
    public string $state;
    public string $zipcode;
    public string $country;
    public ?array $coordinates;

    public function __construct(string $city = '', string $state = '', string $zipcode = '', string $country = '', ?array $coordinates = null)
    {
        $this->city = $city;
        $this->state = $state;
        $this->zipcode = $zipcode;
        $this->country = $country;
        $this->coordinates = $coordinates;
    }
}