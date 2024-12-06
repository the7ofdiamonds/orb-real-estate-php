CREATE DEFINER=`root`@`%` PROCEDURE `getRealEstatePropertyByID`(IN propertyID INT)
BEGIN
SELECT * FROM real_estate WHERE id = propertyID;
END