<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class Provider
{
    public int $id;
    public string $created;
    public string $updated;
    public string $userID;
    public string $name;
    public string $logo;
    public array $services;
    public array $realEstateListingIDs;

    public function construct(
        int $id,
        string $created,
        string $updated,
        string $userID,
        string $name,
        string $logo,
        array $services,
        array $realEstateListingIDs = []
    ) {
        $this->id = $id;
        $this->created = $created;
        $this->updated = $updated;
        $this->userID = $userID;
        $this->name = $name;
        $this->logo = $logo;
        $this->services = $services;
        $this->realEstateListingIDs = $realEstateListingIDs;
    }

    public function fromJSON(stdClass $provider)
    {
        $this->id = $provider->id;
        $this->created = $provider->created;
        $this->updated = $provider->updated;
        $this->userID = $provider->userID;
        $this->name = $provider->name;
        $this->logo = $provider->logo;
        $this->services = $provider->services;
        $this->realEstateListingIDs = $provider->realEstateListingIDs;

        return $this;
    }

    public function fromDB(stdClass $provider)
    {
        $this->id = $provider->id;
        $this->created = $provider->created;
        $this->updated = $provider->updated;
        $this->userID = $provider->userID;
        $this->name = $provider->name;
        $this->logo = $provider->logo;
        $this->services = $provider->services;
        $this->realEstateListingIDs = $provider->realEstateListingIDs;

        return $this;
    }

    public function toJSON()
    {
        return [
            'id' => $this->id,
            'created' => $this->created,
            'updated' => $this->updated,
            'user_id' => $this->userID,
            'name' => $this->name,
            'logo' => $this->logo,
            'services' => $this->services,
            'real_estate_listing_ids' => $this->realEstateListingIDs
        ];
    }
}
