<?php

namespace ORB\Real_Estate\Model;

class SaleDetails {
    public float $price;
    public float $pricePerSqft;
    public float $capRate;

    public function __construct(float $price = 0.00, float $pricePerSqft = 0.0, float $capRate = 0.0)
    {
        $this->price = $price;
        $this->pricePerSqft = $pricePerSqft;
        $this->capRate = $capRate;
    }
}