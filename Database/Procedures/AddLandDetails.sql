CREATE DEFINER=`root`@`%` PROCEDURE `addLandDetails`(
	IN p_real_estate_id BIGINT,
    IN p_parking_spaces INT,
    IN p_land_acres DOUBLE,
    IN P_land_sqft DOUBLE,
	IN p_zoning VARCHAR(255)
)
BEGIN

	START TRANSACTION;

    INSERT INTO land_details(parking_spaces, land_acres, land_sqft, zoning)
    VALUES (p_parking_spaces, p_land_acres, p_land_sqft, p_zoning);

    SET @land_details_id = LAST_INSERT_ID();
    
	CALL updateRealEstatePropertyLandDetails(p_real_estate_id, @land_details_id);
    
    COMMIT;
END