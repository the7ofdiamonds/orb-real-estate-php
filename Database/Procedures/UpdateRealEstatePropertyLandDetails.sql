CREATE DEFINER=`root`@`%` PROCEDURE `updateRealEstatePropertyLandDetails`(
	IN p_real_estate_id BIGINT,
    IN p_land_details_id BIGINT
)
BEGIN

	START TRANSACTION;

    UPDATE real_estate
    SET land_details_id = p_land_details_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END