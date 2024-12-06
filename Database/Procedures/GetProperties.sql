CREATE DEFINER=`root`@`%` PROCEDURE `getProperties`()
BEGIN
SELECT * FROM real_estate;
END