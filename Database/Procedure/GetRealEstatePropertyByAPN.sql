CREATE DEFINER=`root`@`%` PROCEDURE `getRealEstatePropertyByAPN`(IN p_apn_parcel_id VARCHAR(45))
BEGIN
SELECT * FROM real_estate WHERE apn_parcel_id = p_apn_parcel_id;
END