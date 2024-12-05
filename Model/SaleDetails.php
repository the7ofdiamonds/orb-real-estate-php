<?php

namespace ORB\Real_Estate\Model;

class SaleDetails
{
    public string $overview;
    private array $highlights;
    public int $price;
    public float $pricePerSqft;

    public function __construct(
        float $price = 0.00,
        float $pricePerSqft = 0.0,
        string $overview = '',
        array $highlights = []
    ) {
        $this->price = $price;
        $this->pricePerSqft = $pricePerSqft;
        $this->overview = $overview;
        $this->highlights = $highlights;
    }

    function setHighlights()
    {
        return serialize($this->highlights);
    }

    function getHighlights()
    {
        if (!is_serialized($this->highlights)) {
            return $this->highlights;
        }
        
        return serialize($this->highlights);
    }
}
