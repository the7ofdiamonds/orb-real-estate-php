CREATE TABLE `sale_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `real_estate_id` bigint COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `price` int COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `price_per_sqft` float DEFAULT NULL,
  `overview` bigint DEFAULT NULL,
  `highlights` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;