CREATE DEFINER=`root`@`%` PROCEDURE `addSaleDetails`(
	IN p_real_estate_id BIGINT,
    IN p_price INT,
    IN p_price_per_sqft FLOAT,
	IN p_overview VARCHAR(255),
    IN p_highlights TEXT,
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while inserting the sale details.';
    END;

	START TRANSACTION;

    INSERT INTO sale_details(real_estate_id, price, price_per_sqft, overview, highlights)
    VALUES (p_real_estate_id, p_price, p_price_per_sqft, p_overview, p_highlights);

	SET @sale_details_id = LAST_INSERT_ID();
    
	CALL updateRealEstateSaleDetails(p_real_estate_id, @sale_details_id);
    
    COMMIT;
END