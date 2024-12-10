CREATE DEFINER=`root`@`%` PROCEDURE `addImage`(
	IN p_provider_id BIGINT,
	IN p_name VARCHAR(255),
	IN p_description VARCHAR(255),
	IN p_url VARCHAR(255)
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while inserting the image.';
    END;

	START TRANSACTION;

    INSERT INTO image (provider_id, name, description, url)
    VALUES (p_provider_id, p_name, p_description, p_url);
    
    COMMIT;
END