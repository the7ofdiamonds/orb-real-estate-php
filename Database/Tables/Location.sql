CREATE TABLE `location` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `real_estate_id` bigint DEFAULT NULL,
  `street_number` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `street_name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `coordinates` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;