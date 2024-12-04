CREATE DEFINER=`root`@`%` PROCEDURE `getCommercialProperties`()
BEGIN
SELECT * FROM real_estate WHERE property_class = "commercial";
END