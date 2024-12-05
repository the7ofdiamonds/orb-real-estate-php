<?php

namespace ORB\Real_Estate\Model;

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
        float $occupancyRate = 0.0,
        float $netOperatingIncome = 0.00,
        float $propertyValue = 0.0,
        float $capRate = 0.0,
    ) {
        $this->leased = $leased;
        $this->leasedUnits = $leasedUnits;
        $this->totalUnits = $totalUnits;
        $this->occupancyRate = $occupancyRate;
        $this->netOperatingIncome = $netOperatingIncome;
        $this->propertyValue = $propertyValue;
        $this->capRate = $capRate;
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
}
