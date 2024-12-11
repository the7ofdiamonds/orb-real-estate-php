CREATE DEFINER=`root`@`%` PROCEDURE `addInvestmentDetails`(
	IN p_sale_details_id BIGINT,
	IN p_leased INT,
	IN p_leased_units INT,
	IN p_occupancy_rate FLOAT,
	IN p_net_operating_income FLOAT,
	IN p_property_value FLOAT,
	IN p_cap_rate FLOAT
)
BEGIN

	START TRANSACTION;

    INSERT INTO investment_details(leased, leased_units, occupancy_rate, net_operating_income, property_value, cap_rate)
    VALUES (p_leased, p_leased_units, p_occupancy_rate, p_net_operating_income, p_property_value, p_cap_rate);

    SET @investment_details_id = LAST_INSERT_ID();

	CALL updateSaleDetailsInvestmentDetails(p_sale_details_id, @investment_details_id);
    
    COMMIT;
END