CREATE TABLE `land_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `real_estate_id` bigint COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `parking_spaces` int COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `land_acres` double COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `land_sqft` double DEFAULT NULL,
  `zoning` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;