CREATE DEFINER=`root`@`%` PROCEDURE `updateRealEstatePropertyBuildingDetails`(
    IN p_real_estate_id BIGINT,
	IN p_building_details_id BIGINT
)
BEGIN

	START TRANSACTION;

    UPDATE real_estate
    SET building_details_id = p_building_details_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END