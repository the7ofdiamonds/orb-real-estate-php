CREATE DEFINER=`root`@`%` PROCEDURE `searchRealEstate`(
    IN p_property_class VARCHAR(255),
    IN p_street_number VARCHAR(255),
    IN p_street_name VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_state VARCHAR(255),
    IN p_zipcode VARCHAR(255),
    IN p_country VARCHAR(255),
    IN p_coordinates JSON,
    IN p_price INT,
    IN p_price_per_sqft FLOAT,
    IN p_stories INT,
    IN p_year_built YEAR,
    IN p_sprinklers VARCHAR(255),
    IN p_total_building_size DOUBLE,
    IN p_land_acres DOUBLE,
    IN p_land_sqft DOUBLE,
    IN p_zoning VARCHAR(255),
    IN p_parking_spaces INT,
    IN p_provider INT
)
BEGIN
    SET @sql = 'SELECT * FROM real_estate WHERE 1=1';

    IF p_property_class IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND property_class COLLATE utf8mb4_unicode_520_ci = ', QUOTE(p_property_class));
    END IF;
    
    IF p_street_number IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND street_number = ', QUOTE(p_street_number));
    END IF;

    IF p_street_name IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND street_name COLLATE utf8mb4_unicode_520_ci = ', QUOTE(p_street_name));
    END IF;

    IF p_city IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND city COLLATE utf8mb4_unicode_520_ci = ', QUOTE(p_city));
    END IF;

    IF p_state IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND state = ', QUOTE(p_state));
    END IF;

    IF p_zipcode IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND zipcode = ', QUOTE(p_zipcode));
    END IF;

    IF p_country IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND country COLLATE utf8mb4_unicode_520_ci = ', QUOTE(p_country));
    END IF;

    IF p_coordinates IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND JSON_CONTAINS(coordinates, ', QUOTE(p_coordinates), ')');
    END IF;

    IF p_price IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND price <= ', p_price);
    END IF;

    IF p_price_per_sqft IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND price_per_sqft <= ', p_price_per_sqft);
    END IF;

    IF p_stories IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND stories = ', p_stories);
    END IF;

    IF p_year_built IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND year_built = ', p_year_built);
    END IF;

    IF p_sprinklers IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND sprinklers = ', QUOTE(p_sprinklers));
    END IF;

    IF p_total_building_size IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND total_building_size <= ', p_total_building_size);
    END IF;

    IF p_land_acres IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND land_acres <= ', p_land_acres);
    END IF;

    IF p_land_sqft IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND land_sqft <= ', p_land_sqft);
    END IF;

    IF p_zoning IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND zoning COLLATE utf8mb4_unicode_520_ci = ', QUOTE(p_zoning));
    END IF;

    IF p_parking_spaces IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND parking_spaces = ', p_parking_spaces);
    END IF;

    IF p_provider IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND provider = ', p_provider);
    END IF;

    -- Execute the dynamically built query
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END