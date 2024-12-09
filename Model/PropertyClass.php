<?php

namespace ORB\Real_Estate\Model;

use ORB\Real_Estate\Exception\DestructuredException;

use InvalidArgumentException;

enum PropertyClass: string
{
    case RESIDENTIAL = 'residential';
    case COMMERCIAL = 'commercial';
    case INVESTMENT = 'investment';
    case INDUSTRIAL = 'industrial';
    case AGRICULTURAL = 'agricultural';
    case MIXED_USE = 'mixed_use';
    case UNCLASSIFIED = 'unclassified';

    public static function fromString(string $value): PropertyClass
    {
        try {
            return match ($value) {
                self::RESIDENTIAL->value => self::RESIDENTIAL,
                self::COMMERCIAL->value => self::COMMERCIAL,
                self::INVESTMENT->value => self::INVESTMENT,
                self::INDUSTRIAL->value => self::INDUSTRIAL,
                self::AGRICULTURAL->value => self::AGRICULTURAL,
                self::MIXED_USE->value => self::MIXED_USE,
                self::UNCLASSIFIED->value => self::UNCLASSIFIED,
                default => throw new \InvalidArgumentException("Invalid property class: $value"),
            };
        } catch (InvalidArgumentException $e) {
            throw new DestructuredException($e);
        }
    }
}
