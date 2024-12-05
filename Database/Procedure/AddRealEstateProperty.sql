CREATE DEFINER=`root`@`%` PROCEDURE `addRealEstateProperty`(
	IN p_property_class VARCHAR(255),
	IN p_street_number VARCHAR(255),
	IN p_street_name VARCHAR(255),
	IN p_city VARCHAR(255),
	IN p_state VARCHAR(255),
	IN p_zipcode VARCHAR(255),
	IN p_country VARCHAR(255),
	IN p_coordinates JSON,
	IN p_price VARCHAR(255),
	IN p_price_per_sqft VARCHAR(255),
	IN p_overview VARCHAR(255),
	IN p_highlights TEXT,
	IN p_stories VARCHAR(255),
	IN p_year_built YEAR,
	IN p_sprinklers VARCHAR(255),
	IN p_total_bldg_size VARCHAR(255),
	IN p_parking_spaces VARCHAR(255),
	IN p_land_acres VARCHAR(255),
	IN p_land_sqft VARCHAR(255),
	IN p_zoning VARCHAR(255),
	IN p_apn_parcel_id VARCHAR(255), 
	IN p_providers TEXT
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while inserting the real estate property.';
    END;

	START TRANSACTION;

    INSERT INTO real_estate (apn_parcel_id, property_class, street_number, street_name, city, state, zipcode, country, coordinates, price, price_per_sqft, stories, year_built, sprinklers, parking_spaces, total_bldg_size, land_acres, land_sqft, zoning, highlights, overview, provider_id)
    VALUES (p_apn_parcel_id, p_property_class, p_street_number, p_street_name, p_city, p_state, p_zipcode, p_country, p_coordinates, p_price, p_price_per_sqft, p_stories, p_year_built, p_sprinklers, p_parking_spaces, p_total_bldg_size, p_land_acres, p_land_sqft, p_zoning, p_highlights, p_overview, p_providers);

    COMMIT;
END