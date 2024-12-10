CREATE DEFINER=`root`@`%` PROCEDURE `UpdateRealEstatePropertyLocation`(
	IN p_real_estate_id BIGINT,
    IN p_location_id BIGINT
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while updating the real estate property with location.';
    END;

	START TRANSACTION;

    UPDATE real_estate
    SET location_id = p_location_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END