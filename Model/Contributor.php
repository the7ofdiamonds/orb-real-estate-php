<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class Contributor
{
    public ?int $id;
    public int $providerID;
    public string $contribution;
    public float $percentage;

    public function __construct(int $id = null, int $providerID = 0, string $contribution = '', float $percentage = 0.0)
    {
        $this->id = $id;
        $this->providerID = $providerID;
        $this->contribution = $contribution;
        $this->percentage = $percentage;
    }

    public function fromJSON(stdClass $contributor)
    {
        $this->id = $contributor->id ?? null;
        $this->providerID = $contributor->provider_id ?? 0;
        $this->contribution = $contributor->contribution ?? '';
        $this->percentage = $contributor->percentage ?? 0.0;

        return $this;
    }

    public function fromDB(stdClass $contributor)
    {
        $this->id = $contributor->id;
        $this->providerID = $contributor->provider_id ?? 0;
        $this->contribution = $contributor->contribution ?? '';
        $this->percentage = $contributor->percentage ?? 0.0;

        return $this;
    }

    public function toJSON()
    {
        return [
            'id' => $this->id,
            'provider_id' => $this->providerID,
            'contribution' => $this->contribution,
            'percentage' => $this->percentage
        ];
    }
}
