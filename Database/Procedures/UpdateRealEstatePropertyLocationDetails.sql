CREATE DEFINER=`root`@`%` PROCEDURE `updateRealEstatePropertyLocationDetails`(
	IN p_real_estate_id BIGINT,
    IN p_location_details_id BIGINT
)
BEGIN

	START TRANSACTION;

    UPDATE real_estate
    SET location_details_id = p_location_details_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END