CREATE DEFINER=`root`@`%` PROCEDURE `addContributor`(
	IN p_provider_id BIGINT,
	IN p_contribution VARCHAR(255),
	IN p_percentage FLOAT
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while inserting the contributor.';
    END;

	START TRANSACTION;

    INSERT INTO contributor (provider_id, contribution, percentage)
    VALUES (p_provider_id, p_contribution, p_percentage);
    
    COMMIT;
END