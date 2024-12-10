CREATE DEFINER=`root`@`%` PROCEDURE `UpdateRealEstatePropertyBuildingDetails`(
    IN p_real_estate_id BIGINT,
	IN p_building_details_id BIGINT
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while updating the real estate property with building details.';
    END;

	START TRANSACTION;

    UPDATE real_estate
    SET building_details_id = p_building_details_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END