<?php

namespace ORB\Real_Estate\Model;

use stdClass;

class Image
{
    public int $id;
    public string $imageID;
    public string $description;
    public string $url;

    public function __construct(int $id, string $imageID, string $description, string $url)
    {
        $this->id = $id;
        $this->imageID = $imageID;
        $this->description = $description;
        $this->url = $url;
    }

    public function fromJSON(stdClass $image)
    {
        $this->id = $image->id ?? '';
        $this->imageID = $image->image_id ?? '';
        $this->description = $image->description;
        $this->url = $image->url;
        
        return $this;
    }

    public function fromDB(stdClass $image)
    {
        $this->id = $image->id;
        $this->imageID = $image->image_id;
        $this->description = $image->description;
        $this->url = $image->url;
        
        return $this;
    }

    public function toJSON()
    {
        return [
            'id' => $this->id,
            'image_id' => $this->imageID,
            'description' => $this->description,
            'url' => $this->url
        ];
    }
}
