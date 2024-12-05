<?php

namespace ORB\Real_Estate\Model;

enum PropertyClass : string
{
    case RESIDENTIAL = 'residential';
    case COMMERCIAL = 'commercial';
    case INDUSTRIAL = 'industrial';
    case AGRICULTURAL = 'agricultural';
    case MIXED_USE = 'mixed_use';

    public static function fromString(string $value): PropertyClass
    {
        return match ($value) {
            self::RESIDENTIAL->value => self::RESIDENTIAL,
            self::COMMERCIAL->value => self::COMMERCIAL,
            self::INDUSTRIAL->value => self::INDUSTRIAL,
            self::AGRICULTURAL->value => self::AGRICULTURAL,
            self::MIXED_USE->value => self::MIXED_USE,
            default => throw new \InvalidArgumentException("Invalid property class: $value"),
        };
    }
}
