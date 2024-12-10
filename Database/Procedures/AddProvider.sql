CREATE DEFINER=`root`@`%` PROCEDURE `addProvider`(
	IN p_user_id BIGINT,
	IN p_name VARCHAR(255),
	IN p_services TEXT
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while inserting the provider.';
    END;

	START TRANSACTION;

    INSERT INTO provider (user_id, name, services)
    VALUES (p_user_id, p_name, p_services);
    
    COMMIT;
END