<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class InvestmentDetails
{
    public bool $leased;
    public int $leasedUnits;
    public int $totalUnits;
    public float $occupancyRate;
    public float $netOperatingIncome;
    public float $propertyValue;
    public float $capRate;

    public function __construct(
        bool $leased = false,
        int $leasedUnits = 0,
        int $totalUnits = 0,
        float $netOperatingIncome = 0.00,
        float $propertyValue = 0.00,
    ) {
        $this->leased = $leased;
        $this->leasedUnits = $leasedUnits;
        $this->totalUnits = $totalUnits;
        $this->occupancyRate = $this->getOccupancyRate();
        $this->netOperatingIncome = $netOperatingIncome;
        $this->propertyValue = $propertyValue;
        $this->capRate = $this->getCapRate();
    }

    function getOccupancyRate(): float
    {
        if (!$this->leased || $this->leasedUnits <= 0 || $this->totalUnits <= 0) {
            return 0.0;
        }

        return $this->leasedUnits / $this->totalUnits;
    }

    function getCapRate()
    {
        if (!$this->leased || $this->netOperatingIncome <= 0 || $this->propertyValue <= 0) {
            return 0.0;
        }

        return $this->netOperatingIncome / $this->propertyValue;
    }

    public function fromJSON(stdClass $investment_details)
    {
        $this->leased = $investment_details->leased ?? false;
        $this->leasedUnits = $investment_details->leasedUnits ?? 0;
        $this->totalUnits = $investment_details->totalUnits ?? 0;
        $this->occupancyRate = $this->getOccupancyRate();
        $this->netOperatingIncome = $investment_details->netOperatingIncome ?? 0.00;
        $this->propertyValue = $investment_details->propertyValue ?? 0.00;
        $this->capRate = $this->getCapRate();
        return $this;
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}
