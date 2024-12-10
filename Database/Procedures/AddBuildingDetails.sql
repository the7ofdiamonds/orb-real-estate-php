CREATE DEFINER=`root`@`%` PROCEDURE `addBuildingDetails`(
	IN p_land_details_id BIGINT,
	IN p_stories INT,
	IN p_year_built INT,
	IN p_sprinklers VARCHAR(255),
	IN p_total_building_size DOUBLE
)
BEGIN
 	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while inserting the building details.';
    END;

	START TRANSACTION;

    INSERT INTO building_details(land_details_id, stories, year_built, sprinklers, total_building_size)
    VALUES (p_land_details_id, p_stories, p_year_built, p_sprinklers, p_total_building_size);
    
    COMMIT;
END