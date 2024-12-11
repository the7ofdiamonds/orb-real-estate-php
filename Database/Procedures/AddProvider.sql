CREATE DEFINER=`root`@`%` PROCEDURE `addProvider`(
	IN p_user_id BIGINT,
	IN p_name VARCHAR(255),
	IN p_services TEXT
)
BEGIN

	START TRANSACTION;

    INSERT INTO provider (user_id, name, services)
    VALUES (p_user_id, p_name, p_services);
    
    COMMIT;
END