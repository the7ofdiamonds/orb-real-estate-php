CREATE DEFINER=`root`@`%` PROCEDURE `addRealEstateProperty`(
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
	IN p_overview VARCHAR(255),
    IN p_highlights TEXT,
    IN p_stories INT,
    IN p_year_built YEAR,
    IN p_sprinklers VARCHAR(255),
    IN p_total_building_size DOUBLE,
    IN p_parking_spaces INT,
    IN p_land_acres DOUBLE,
    IN P_land_sqft DOUBLE,
	IN p_zoning VARCHAR(255),
	IN p_apn_parcel_id VARCHAR(255),
	IN p_images JSON,
    IN p_contributors JSON
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while inserting the real estate property.';
    END;

	START TRANSACTION;

    INSERT INTO real_estate (property_class, apn_parcel_id, images, contributors)
    VALUES (p_property_class, p_apn_parcel_id, p_images, p_contributors);

	SET @real_estate_id = LAST_INSERT_ID();
    
	CALL addLocationDetails(@real_estate_id, p_street_number, p_street_name, p_city, p_state, p_zipcode, p_country, p_coordinates);
	CALL addSaleDetails(@real_estate_id, p_price, p_price_per_sqft, p_overview, p_highlights);
	CALL addBuildingDetails(@real_estate_id, p_stories, p_year_built, p_sprinklers, p_total_building_size);
	CALL addLandDetails(@real_estate_id, p_parking_spaces, p_land_acres, p_land_sqft, p_zoning);
    
    COMMIT;
END