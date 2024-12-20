<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class SaleDetails
{
    public string $overview;
    public array $highlights;
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

    function getHighlights(string $highlights)
    {
        if (is_serialized($highlights)) {
            return unserialize($highlights);
        }

        return $highlights;
    }

    public function fromJSON(stdClass $sale_details)
    {
        $this->price = $sale_details->price ?? 0.00;
        $this->pricePerSqft = $sale_details->price_per_sqft ?? 0.00;
        $this->overview = $sale_details->overview ?? '';
        $this->highlights = isset($sale_details->highlights) ? $sale_details->highlights : [];
        return $this;
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}
