CREATE DEFINER=`root`@`%` PROCEDURE `updateRealEstatePropertySaleDetails`(
	IN p_real_estate_id BIGINT,
    IN p_sale_details_id BIGINT
)
BEGIN

	START TRANSACTION;

    UPDATE real_estate
    SET sale_details_id = p_sale_details_id
    WHERE id = p_real_estate_id;
    
    COMMIT;
END