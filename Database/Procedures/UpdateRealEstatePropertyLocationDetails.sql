CREATE DEFINER=`root`@`%` PROCEDURE `UpdateRealEstatePropertyLocationDetails`(
	IN p_real_estate_id BIGINT,
    IN p_location_details_id BIGINT
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while updating the real estate property with location details.';
    END;

	START TRANSACTION;

    UPDATE real_estate
    SET location_details_id = p_location_details_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END