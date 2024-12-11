CREATE DEFINER=`root`@`%` PROCEDURE `addLocationDetails`(
	IN p_real_estate_id BIGINT,
	IN p_street_number VARCHAR(255),
	IN p_street_name VARCHAR(255),
	IN p_city VARCHAR(255),
	IN p_state VARCHAR(255),
	IN p_zipcode VARCHAR(255),
	IN p_country VARCHAR(255),
    IN p_coordinates JSON
)
BEGIN

	START TRANSACTION;

    INSERT INTO location_details(street_number, street_name, city, state, zipcode, country, coordinates)
    VALUES (p_street_number, p_street_name, p_city, p_state, p_zipcode, p_country, p_coordinates);

    SET @location_details_id = LAST_INSERT_ID();
    
	CALL updateRealEstatePropertyLocationDetails(p_real_estate_id, @location_details_id);
    
    COMMIT;
END