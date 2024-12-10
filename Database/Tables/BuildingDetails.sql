CREATE TABLE `building_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `land_details_id` bigint COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `stories` int COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `year_built` int COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `sprinklers` varchar(255) DEFAULT NULL,
  `total_building_size` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;