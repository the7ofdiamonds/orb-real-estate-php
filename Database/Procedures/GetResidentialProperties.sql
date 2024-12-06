CREATE DEFINER=`root`@`%` PROCEDURE `getResidentialProperties`()
BEGIN
SELECT * FROM real_estate WHERE property_class = "residential";
END