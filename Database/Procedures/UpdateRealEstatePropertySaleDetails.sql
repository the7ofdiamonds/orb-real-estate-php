CREATE DEFINER=`root`@`%` PROCEDURE `UpdateRealEstatePropertySaleDetails`(
	IN p_real_estate_id BIGINT,
    IN p_sale_details_id BIGINT
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while updating real estate property with sale details.';
    END;

	START TRANSACTION;

    UPDATE real_estate
    SET sale_details_id = p_sale_details_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END