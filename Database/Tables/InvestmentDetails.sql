CREATE TABLE `investment_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sale_details_id` bigint COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `leased` int COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `leased_units` int COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `occupancy_rate` float DEFAULT NULL,
  `net_operating_income` float DEFAULT NULL,
  `property_value` float DEFAULT NULL,
  `cap_rate` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;