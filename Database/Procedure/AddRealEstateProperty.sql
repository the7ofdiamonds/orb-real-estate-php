CREATE DEFINER=`root`@`%` PROCEDURE `addRealEstateProperty`(
    IN p_apn_parcel_id VARCHAR(255), 
	IN p_type VARCHAR(255),
	IN p_street_number VARCHAR(255),
	IN p_street_name VARCHAR(255),
	IN p_city VARCHAR(255),
	IN p_state VARCHAR(255),
	IN p_zipcode VARCHAR(255),
	IN p_country VARCHAR(255),
	IN p_coordinates VARCHAR(255),
	IN p_price VARCHAR(255),
	IN p_price_SF VARCHAR(255),
	IN p_cap_rate VARCHAR(255),
	IN p_stories VARCHAR(255),
	IN p_year_built VARCHAR(255),
	IN p_sprinklers VARCHAR(255),
	IN p_parking_spaces VARCHAR(255),
	IN p_total_bldg_size VARCHAR(255),
	IN p_land_acres VARCHAR(255),
	IN p_land_sqft VARCHAR(255),
	IN p_zoning VARCHAR(255),
	IN p_highlights VARCHAR(255),
	IN p_overview VARCHAR(255),
	IN p_provider_id VARCHAR(255)
)
BEGIN
	START TRANSACTION;
    
    INSERT INTO real_estate (apn_parcel_id, type, street_number, street_name, city, state, zipcode, country, coordinates, price, price_SF, cap_rate, stories, year_built, sprinklers, parking_spaces, total_bldg_size, land_acres, land_sqft, zoning, highlights, overview, provider_id)
    VALUES (p_apn_parcel_id, p_type, p_street_number, p_street_name, p_city, p_state, p_zipcode, p_country, p_coordinates, p_price, p_price_SF, p_cap_rate, p_stories, p_year_built, p_sprinklers, p_parking_spaces, p_total_bldg_size, p_land_acres, p_land_sqft, p_zoning, p_highlights, p_overview, p_provider_id);

    COMMIT;
END
